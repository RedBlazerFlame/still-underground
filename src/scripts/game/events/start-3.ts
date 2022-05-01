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
        text: `The investigation was going well until you suddenly fall into a hole! You get up and see multiple computers with animating software open. You look at the wall and see a poster...`,
        delay: 0.05,
    });

    await delayer.delay(0.5);

    // Show Buttons
    game.view.navigator.showNext();

    game.view.navigator.showPrev();

    await new Promise((r) => {
        game.view.navigator.nextAddEventListener("click", (ev) => {
            game.dispatcher.dispatch({
                event: "start-4",
            });
            r(undefined);
        });

        game.view.navigator.previousAddEventListener("click", (ev) => {
            game.dispatcher.dispatch({
                event: "start-2",
            });
            r(undefined);
        });
    });
};

export default main;
