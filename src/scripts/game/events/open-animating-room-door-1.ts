import { el } from "../../aliases.js";
import { delay, delayer, textDisplayer } from "../../asyncHelpers.js";
import { appendChildren, parseHTML } from "../../domHelpers.js";
import { GameObject } from "../../Game.js";
import { EventHandler } from "../events.js";

const main: EventHandler = async function (game: GameObject) {
    // Preprocessing
    game.view.navigator.hidePrev();

    game.store.data.animatingRoomDoorState = "OPEN";

    // Text
    let p1 = el("p");

    game.view.content.element.appendChild(p1);

    await textDisplayer.displayAsynchronously({
        e: p1,
        text: "The computer informs you that your answer was correct. ",
        delay: 0.05,
    });

    await delayer.delay(0.4);

    await textDisplayer.displayAsynchronously({
        e: p1,
        text: "You hear the door open.",
        delay: 0.05,
    });

    await delayer.delay(1);

    // Setting up controls
    await new Promise((r) => {
        game.view.navigator.nextAddEventListener("click", (ev) => {
            game.dispatcher.dispatch({
                event: "animating-room-1",
            });

            r(null);
        });
    });
};

export default main;
