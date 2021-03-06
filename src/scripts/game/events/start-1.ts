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
        text: `You are a cop who has been tasked to investigate the recent missing people
cases in your town. Rumors say that, in the mountains, there is a basement
where a local artist named `,
        delay: 0.05,
    });

    let b1 = el("b");

    p1.appendChild(b1);

    await textDisplayer.displayAsynchronously({
        e: b1,
        text: `Eve`,
        delay: 0.05,
    });

    await textDisplayer.displayAsynchronously({
        e: p1,
        text: ` keeps his animators trapped and forces them to make music videos for him.`,
        delay: 0.05,
    });

    await delayer.delay(0.5);

    // Show Next Button
    game.view.navigator.showNext();

    await new Promise((r) => {
        game.view.navigator.nextAddEventListener("click", (ev) => {
            game.dispatcher.dispatch({
                event: "start-2",
            });
            r(undefined);
        });
    });
};

export default main;
