import { el } from "../../aliases.js";
import { delay, delayer, textDisplayer } from "../../asyncHelpers.js";
import { appendChildren, parseHTML } from "../../domHelpers.js";
import { GameObject } from "../../Game.js";
import { EventHandler } from "../events.js";

const main: EventHandler = async function (game: GameObject) {
    // Preprocessing
    game.view.navigator.hide();
    let doorIsOpen = game.store.data.animatingRoomDoorState === "OPEN";

    // Display the text

    let p1 = el("p");
    game.view.content.element.appendChild(p1);

    if (doorIsOpen) {
        await textDisplayer.displayAsynchronously({
            e: p1,
            text: "The door is open.",
            delay: 0.05,
        });

        await delayer.delay(0.4);

        await textDisplayer.displayAsynchronously({
            e: p1,
            text: " Do you want to go to the next room?",
            delay: 0.05,
        });

        await delayer.delay(1);
    } else {
        await textDisplayer.displayAsynchronously({
            e: p1,
            text: "The door is closed.",
            delay: 0.05,
        });

        await delayer.delay(0.4);

        await textDisplayer.displayAsynchronously({
            e: p1,
            text: " Perhaps something else will open it?",
            delay: 0.05,
        });

        await delayer.delay(1);
    }

    // Create the Controls

    await new Promise((r) => {
        if (doorIsOpen) {
            let walkThroughDoor = parseHTML(
                "<input class='margin-12px' type='button' form='controls' value='Walk through the Door'>"
            )[0];

            game.view.controls.element.appendChild(walkThroughDoor);

            walkThroughDoor.addEventListener("click", (ev) => {
                // TODO Recording Studio
                // game.dispatcher.dispatch({
                //     event: "recording-studio-1",
                // });

                game.dispatcher.dispatch({
                    event: "project-proposal-phase-ii-ending",
                });

                r(undefined);
            });
        }

        let backToAnimatingRoom = parseHTML(
            `<input class='margin-12px' type='button' form='controls' value='Go Back'>`
        )[0];

        game.view.controls.element.appendChild(backToAnimatingRoom);

        backToAnimatingRoom.addEventListener("click", (ev) => {
            game.dispatcher.dispatch({
                event: "animating-room-1",
            });

            r(undefined);
        });
    });
};

export default main;
