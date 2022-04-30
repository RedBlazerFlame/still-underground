// Imports
import bestTimeStore from "./bestTimeStore.js";

// Getting a Reference to HTML elements
const goodTableBody = document.querySelector("#goodTable tbody") as HTMLElement;
const neutralTableBody = document.querySelector(
    "#neutralTable tbody"
) as HTMLElement;

// Helper Functions
function prependLeadingZeroes(s: string, len: number): string {
    let stringLength = s.length;

    let amountToPrepend = Math.max(len - stringLength, 0);

    return `${"0".repeat(amountToPrepend)}${s}`;
}

function formatAsTimeString(t: number) {
    let seconds = t % 60;
    let totalMinutes = Math.floor(t / 60);
    let minutes = totalMinutes % 60;
    let totalHours = Math.floor(totalMinutes / 60);
    let hours = totalHours % 24;
    let totalDays = Math.floor(totalHours / 24);

    let res = "";

    if (totalDays > 0) res += `${prependLeadingZeroes(`${totalDays}`, 3)} : `;
    if (totalHours > 0) res += `${prependLeadingZeroes(`${totalHours}`, 2)} : `;
    res += `${prependLeadingZeroes(`${totalMinutes}`, 2)} : `;
    res += `${prependLeadingZeroes(`${seconds}`, 2)}`;

    return res;
}

// Fetch the Leaderboard Data
(async () => {
    // Fetching the top 10 good ending times, the top 10 bad ending times, and the user's best times
    const { bestGoodId, bestNeutralId } = bestTimeStore.data;

    console.dir({ bestGoodId, bestNeutralId });

    // console.log(await fetch("/api/test/mayoigo").then((res) => res.json()));

    let [
        goodEndingTop,
        neutralEndingTop,
        selfGoodEndingTime,
        selfNeutralEndingTime,
    ] = await Promise.all([
        fetch("/api/good-ending-times").then((res) => res.json()),
        fetch("/api/neutral-ending-times").then((res) => res.json()),
        ...[
            typeof bestGoodId === "string"
                ? fetch(`/api/good-ending-times/${bestGoodId}`)
                      .then((res) => res.json())
                      .catch((e) => undefined)
                : new Promise((res) => res(undefined)),
        ],
        ...[
            typeof bestNeutralId === "string"
                ? fetch(`/api/neutral-ending-times/${bestNeutralId}`)
                      .then((res) => res.json())
                      .catch((e) => undefined)
                : new Promise((res) => res(undefined)),
        ],
    ]);

    // Extracting Response Data
    type LeaderboardEntry = [
        number,
        string,
        {
            "@ref": {
                id: string;
            };
        }
    ];
    let bestGoodEndingTimes: LeaderboardEntry[] = goodEndingTop.data;
    let bestNeutralEndingTimes: LeaderboardEntry[] = neutralEndingTop.data;

    // Showing the top 10 (GOOD ENDING)
    let appendUserEntry = true;

    bestGoodEndingTimes.forEach(
        (
            [
                time,
                username,
                {
                    "@ref": { id },
                },
            ],
            i
        ) => {
            const rowElement = document.createElement("tr");

            if (id === bestGoodId) {
                // If the current entry is the user's best entry, highlight it
                rowElement.classList.add("highlighted", "heavy-top-border");
                appendUserEntry = false;
            }

            // Appending the rank
            let cell1 = document.createElement("td");
            cell1.appendChild(document.createTextNode((i + 1).toString()));
            rowElement.appendChild(cell1);

            // Appending the name
            let cell2 = document.createElement("td");
            cell2.appendChild(document.createTextNode(username));
            rowElement.appendChild(cell2);

            // Appending the time
            let cell3 = document.createElement("td");
            cell3.appendChild(
                document.createTextNode(formatAsTimeString(time))
            );
            rowElement.appendChild(cell3);

            goodTableBody.appendChild(rowElement);
        }
    );

    if (appendUserEntry && selfGoodEndingTime !== undefined) {
        // Showing the player's best time
        const rowElement = document.createElement("tr");

        rowElement.classList.add("highlighted", "heavy-top-border");

        // Appending the rank
        let cell1 = document.createElement("td");
        cell1.appendChild(document.createTextNode("--"));
        rowElement.appendChild(cell1);

        // Appending the name
        let cell2 = document.createElement("td");
        cell2.appendChild(
            document.createTextNode(selfGoodEndingTime.data.username)
        );
        rowElement.appendChild(cell2);

        // Appending the time
        let cell3 = document.createElement("td");
        cell3.appendChild(
            document.createTextNode(
                formatAsTimeString(selfGoodEndingTime.data.time)
            )
        );
        rowElement.appendChild(cell3);

        goodTableBody.appendChild(rowElement);
    }

    // Showing the top 10 (NEUTRAL ENDING)
    appendUserEntry = true;

    bestNeutralEndingTimes.forEach(
        (
            [
                time,
                username,
                {
                    "@ref": { id },
                },
            ],
            i
        ) => {
            const rowElement = document.createElement("tr");

            if (id === bestNeutralId) {
                // If the current entry is the user's best entry, highlight it
                rowElement.classList.add("highlighted", "heavy-top-border");
                appendUserEntry = false;
            }

            // Appending the rank
            let cell1 = document.createElement("td");
            cell1.appendChild(document.createTextNode((i + 1).toString()));
            rowElement.appendChild(cell1);

            // Appending the name
            let cell2 = document.createElement("td");
            cell2.appendChild(document.createTextNode(username));
            rowElement.appendChild(cell2);

            // Appending the time
            let cell3 = document.createElement("td");
            cell3.appendChild(
                document.createTextNode(formatAsTimeString(time))
            );
            rowElement.appendChild(cell3);

            neutralTableBody.appendChild(rowElement);
        }
    );

    if (appendUserEntry && selfNeutralEndingTime !== undefined) {
        // Showing the player's best time
        const rowElement = document.createElement("tr");

        rowElement.classList.add("highlighted", "heavy-top-border");

        // Appending the rank
        let cell1 = document.createElement("td");
        cell1.appendChild(document.createTextNode("--"));
        rowElement.appendChild(cell1);

        // Appending the name
        let cell2 = document.createElement("td");
        cell2.appendChild(
            document.createTextNode(selfNeutralEndingTime.data.username)
        );
        rowElement.appendChild(cell2);

        // Appending the time
        let cell3 = document.createElement("td");
        cell3.appendChild(
            document.createTextNode(
                formatAsTimeString(selfNeutralEndingTime.data.time)
            )
        );
        rowElement.appendChild(cell3);

        neutralTableBody.appendChild(rowElement);
    }
})();
