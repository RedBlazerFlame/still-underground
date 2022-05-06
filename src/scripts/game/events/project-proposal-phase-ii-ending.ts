import { el, txt } from "../../aliases.js";
import { delay, delayer, textDisplayer } from "../../asyncHelpers.js";
import { appendChildren, parseHTML } from "../../domHelpers.js";
import { GameObject } from "../../Game.js";
import { EventHandler } from "../events.js";

const main: EventHandler = async function (game: GameObject) {
    // Preprocessing
    game.view.navigator.hidePrev();
    game.view.navigator.hideNext();
    game.store.data.ending = "GOOD";

    // Displaying text and other plot elements
    let p1 = el("p");

    game.view.content.element.appendChild(p1);

    await textDisplayer.displayAsynchronously({
        e: p1,
        text: "STILL UNDERGROUND DEMO",
        delay: 0.05,
    });

    appendChildren(p1, [el("br"), el("br")]);

    await delayer.delay(1);

    await textDisplayer.displayAsynchronously({
        e: p1,
        text: "This game is a work in progress.",
        delay: 0.05,
    });

    appendChildren(p1, [el("br"), el("br")]);

    await delayer.delay(1);

    await textDisplayer.displayAsynchronously({
        e: p1,
        text: "More content will be added soon.",
        delay: 0.05,
    });

    appendChildren(p1, [el("br"), el("br")]);

    await delayer.delay(1);

    await textDisplayer.displayAsynchronously({
        e: p1,
        text: "Thanks for playing!",
        delay: 0.05,
    });

    appendChildren(p1, [el("br"), el("br")]);

    await delayer.delay(1);

    /// THE END (Temporary Ending)

    let p4 = el("p");

    game.view.content.element.appendChild(p4);

    await textDisplayer.displayAsynchronously({
        e: p4,
        text: "THE END (Temporary Ending)",
        delay: 0.05,
    });

    await delayer.delay(1);

    // Create Inputs

    let investigateButton = parseHTML(
        "<input type='submit' value='Finish the Game' form='controls'>"
    )[0];

    game.view.controls.element.appendChild(investigateButton);

    // Add Event Listeners
    await new Promise((r) => {
        game.view.controls.addEventListener("submit", (ev) => {
            game.dispatcher.dispatch({
                event: "finish",
            });

            r(undefined);
        });
    });
};

export default main;
