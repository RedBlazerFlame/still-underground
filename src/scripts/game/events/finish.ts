import { el } from "../../aliases.js";
import { delay, delayer, textDisplayer } from "../../asyncHelpers.js";
import bestTimeStore from "../../bestTimeStore.js";
import { appendChildren, parseHTML } from "../../domHelpers.js";
import { GameObject } from "../../Game.js";
import { EventHandler } from "../events.js";

const main: EventHandler = async function (game: GameObject) {
    // Preprocessing
    game.view.navigator.hide();

    // Storing Best Times
    if (game.store.data.ending === "GOOD") {
        let currentBestGoodId = bestTimeStore.data.bestGoodId;

        let runTime = parseFloat(
            ((Date.now() - game.store.data.timeStart) / 1000).toFixed(2)
        );

        async function createNewEntry() {
            const createNewEntryPromise = fetch("/api/good-ending-times", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: game.store.data.username,
                    time: runTime,
                }),
            });

            let newEntry = await createNewEntryPromise.then((res) =>
                res.json()
            );

            let newId: string | undefined = newEntry?.ref?.["@ref"]?.id;

            if (newId !== undefined) {
                bestTimeStore.data.bestGoodId = newId;
            }
        }

        if (currentBestGoodId === undefined) {
            await createNewEntry();
        } else {
            const getCurrentBestEntry = await fetch(
                `/api/good-ending-times/${currentBestGoodId}`
            ).then((res) => res.json());

            const bestTime: number | undefined =
                getCurrentBestEntry?.data?.time;

            if (bestTime !== undefined) {
                if (runTime < bestTime) {
                    await createNewEntry();
                }
            } else {
                await createNewEntry();
            }
        }
    } else if (game.store.data.ending === "NEUTRAL") {
        let currentBestNeutralId = bestTimeStore.data.bestNeutralId;

        let runTime = parseFloat(
            ((Date.now() - game.store.data.timeStart) / 1000).toFixed(2)
        );

        async function createNewEntry() {
            const createNewEntryPromise = fetch("/api/neutral-ending-times", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: game.store.data.username,
                    time: runTime,
                }),
            });

            let newEntry = await createNewEntryPromise.then((res) =>
                res.json()
            );

            let newId: string | undefined = newEntry?.ref?.["@ref"]?.id;

            if (newId !== undefined) {
                bestTimeStore.data.bestNeutralId = newId;
            }
        }

        if (currentBestNeutralId === undefined) {
            await createNewEntry();
        } else {
            const getCurrentBestEntry = await fetch(
                `/api/neutral-ending-times/${currentBestNeutralId}`
            ).then((res) => res.json());

            const bestTime: number | undefined =
                getCurrentBestEntry?.data?.time;

            if (bestTime !== undefined) {
                if (runTime < bestTime) {
                    await createNewEntry();
                }
            } else {
                await createNewEntry();
            }
        }
    }

    // Clearing LocalStorage
    game.store.delete();

    // Concluding Text
    let p1 = el("p");

    game.view.content.element.appendChild(p1);

    p1.appendChild(
        parseHTML(`<section class="width-60vw h1">
    <img class="width-60vw" src="/images/logo.png" alt="Still Underground" />
</section>`)[0]
    );

    p1.appendChild(el("br"));

    await delayer.delay(2);

    await textDisplayer.displayAsynchronously({
        e: p1,
        text: "Made by RedBlazerFlame.",
        delay: 0.05,
    });

    appendChildren(p1, [el("br"), el("br")]);

    await delayer.delay(2);

    await textDisplayer.displayAsynchronously({
        e: p1,
        text: "Thanks for Playing!",
        delay: 0.05,
    });

    await delayer.delay(4);

    game.view.content.element.innerHTML = "";

    // Redirect to Leaderboard

    window.location.replace("/leaderboard");

    // The game ends here. Nothing to see anymore :>
};

export default main;
