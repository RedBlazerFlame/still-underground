import { el } from "../../aliases.js";
import { delay, delayer, textDisplayer } from "../../asyncHelpers.js";
import { appendChildren, parseHTML } from "../../domHelpers.js";
import { GameObject } from "../../Game.js";
import { EventHandler } from "../events.js";

const main: EventHandler = async function (game: GameObject) {
    // Updating the View
    game.view.navigator.hidePrev();

    game.view.navigator.hideNext();

    // Main Story
    let p1 = el("p");
    game.view.content.element.appendChild(p1);

    await textDisplayer.displayAsynchronously({
        e: p1,
        text: `One day, Eve announced that he would be on tour for a festival named `,
        delay: 0.05,
    });

    let b1 = el("b");

    p1.appendChild(b1);

    await textDisplayer.displayAsynchronously({
        e: b1,
        text: "HikiFes 2019",
        delay: 0.05,
    });

    await textDisplayer.displayAsynchronously({
        e: p1,
        text: `. You decided to take this opportunity to investigate the area and to confirm if the basement exists. You suspect that the missing people were trapped in this basement.`,
        delay: 0.05,
    });

    await delayer.delay(0.5);

    // Show Buttons
    game.view.navigator.showNext();

    game.view.navigator.showPrev();

    await new Promise((r) => {
        game.view.navigator.nextAddEventListener("click", (ev) => {
            game.dispatcher.dispatch({
                event: "start-3",
            });
            r(undefined);
        });

        game.view.navigator.previousAddEventListener("click", (ev) => {
            game.dispatcher.dispatch({
                event: "start-1",
            });
            r(undefined);
        });
    });
};

export default main;
