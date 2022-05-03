import { el } from "../../aliases.js";
import { delay, delayer, textDisplayer } from "../../asyncHelpers.js";
import { appendChildren, parseHTML } from "../../domHelpers.js";
import { GameObject } from "../../Game.js";
import { EventHandler } from "../events.js";

const main: EventHandler = async function (game: GameObject) {
    // Preprocessing
    game.view.navigator.hide();
    let visitedRecordingStudio =
        game.store.data.visits["recording-studio-1"] > 0;

    // Display the text
    if (game.store.data.animatingRoomDoorState === "CLOSED") {
        let p1 = el("p");
        game.view.content.element.appendChild(p1);

        await textDisplayer.displayAsynchronously({
            e: p1,
            text: "You notice a locked door on the left.",
            delay: 0.05,
        });

        await delayer.delay(0.4);

        await textDisplayer.displayAsynchronously({
            e: p1,
            text: " Where is the key, though?",
            delay: 0.05,
        });

        p1.appendChild(el("br"));

        await delayer.delay(1);

        await textDisplayer.displayAsynchronously({
            e: p1,
            text: "You inspect the computers for clues.",
            delay: 0.05,
        });

        await delayer.delay(0.4);

        await textDisplayer.displayAsynchronously({
            e: p1,
            text: " You notice one of the computers is not running animating software and is instead displaying something else",
            delay: 0.05,
        });

        await textDisplayer.displayAsynchronously({
            e: p1,
            text: "...",
            delay: 0.2,
        });

        await delayer.delay(1);
    } else {
        let p1 = el("p");
        game.view.content.element.appendChild(p1);

        if (visitedRecordingStudio) {
            await textDisplayer.displayAsynchronously({
                e: p1,
                text: "You're back in the animating room.",
                delay: 0.05,
            });
        } else {
            await textDisplayer.displayAsynchronously({
                e: p1,
                text: "The door is open, ",
                delay: 0.05,
            });

            await delayer.delay(0.4);

            await textDisplayer.displayAsynchronously({
                e: p1,
                text: " perhaps there is another clue in this room though...",
                delay: 0.05,
            });
        }

        if (game.store.data.animatorQuartersLock1 === "CLOSED") {
            p1.appendChild(el("br"));

            await delayer.delay(1);

            await textDisplayer.displayAsynchronously({
                e: p1,
                text: "Perhaps the computer holds more clues?",
                delay: 0.05,
            });
        }

        await delayer.delay(1);
    }

    // Create controls

    await new Promise((r) => {
        if (visitedRecordingStudio) {
            let gotoRecordingStudio = parseHTML(
                "<input class='margin-12px' type='button' form='controls' value='Recording Studio'>"
            )[0];

            game.view.controls.element.appendChild(gotoRecordingStudio);

            gotoRecordingStudio.addEventListener("click", (ev) => {
                game.dispatcher.dispatch({
                    event: "recording-studio-1",
                });

                r(undefined);
            });
        } else {
            let inspectDoor = parseHTML(
                "<input class='margin-12px' type='button' form='controls' value='Inspect the Door'>"
            )[0];

            game.view.controls.element.appendChild(inspectDoor);

            inspectDoor.addEventListener("click", (ev) => {
                game.dispatcher.dispatch({
                    event: "animating-room-inspect-door",
                });

                r(undefined);
            });
        }

        let inspectComputer = parseHTML(
            "<input class='margin-12px' type='button' form='controls' value='Inspect the Computer'>"
        )[0];

        game.view.controls.element.appendChild(inspectComputer);

        inspectComputer.addEventListener("click", (ev) => {
            game.dispatcher.dispatch({
                event: "animating-room-computer",
            });

            r(undefined);
        });
    });
};

export default main;
