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
    // TODO World Domination Drawing

    /// Paragraph 1

    let p1 = el("p");
    game.view.content.element.appendChild(p1);

    await textDisplayer.displayAsynchronously({
        e: p1,
        text: `Upon looking at the poster, you realize where you are: `,
        delay: 0.05,
    });

    await delayer.delay(0.5);

    let b1 = el("b");
    let i1 = el("i");

    b1.appendChild(i1);

    p1.appendChild(b1);

    await textDisplayer.displayAsynchronously({
        e: i1,
        text: `Eve's basement.`,
        delay: 0.1,
    });

    await delayer.delay(1);

    /// Paragraph 2

    let p2 = el("p");
    game.view.content.element.appendChild(p2);

    await textDisplayer.displayAsynchronously({
        e: p2,
        text: `The basement is real, and you are trapped in it.`,
        delay: 0.05,
    });

    await delayer.delay(1);

    /// Paragraph 3

    let p3 = el("p");
    game.view.content.element.appendChild(p3);

    await textDisplayer.displayAsynchronously({
        e: p3,
        text: `You're starting to think that all those rumors might be true.`,
        delay: 0.05,
    });

    /// Paragraph 4

    let p4 = el("p");
    game.view.content.element.appendChild(p4);

    await textDisplayer.displayAsynchronously({
        e: p4,
        text: `There is only one way to find out if there are, `,
        delay: 0.05,
    });

    await delayer.delay(0.2);

    await textDisplayer.displayAsynchronously({
        e: p4,
        text: `indeed, `,
        delay: 0.05,
    });

    await delayer.delay(0.2);

    await textDisplayer.displayAsynchronously({
        e: p4,
        text: `animators trapped in the basement.`,
        delay: 0.05,
    });

    await delayer.delay(1.5);

    await textDisplayer.displayAsynchronously({
        e: p4,
        text: ` You must `,
        delay: 0.05,
    });

    let bold4 = el("b");
    p4.appendChild(bold4);

    await textDisplayer.displayAsynchronously({
        e: bold4,
        text: `investigate`,
        delay: 0.05,
    });

    await textDisplayer.displayAsynchronously({
        e: p4,
        text: `.`,
        delay: 0.05,
    });

    await delayer.delay(1);

    // Create Inputs
    let investigateButton = parseHTML(
        "<input type='submit' value='Begin your Investigation' form='controls'>"
    )[0];

    game.view.controls.element.appendChild(investigateButton);

    // Show Buttons and Inputs
    game.view.navigator.showPrev();

    await new Promise((r) => {
        game.view.controls.addEventListener("submit", (ev) => {
            // TODO animating-room-1

            game.dispatcher.dispatch({
                event: "animating-room-1",
            });
            r(undefined);
        });

        game.view.navigator.previousAddEventListener("click", (ev) => {
            game.dispatcher.dispatch({
                event: "start-3",
            });
            r(undefined);
        });
    });
};

export default main;
