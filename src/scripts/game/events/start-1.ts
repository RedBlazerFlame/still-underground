import { delay } from "../../asyncHelpers.js";
import { appendChildren, parseHTML } from "../../domHelpers.js";
import { GameObject } from "../../Game.js";
import { EventHandler } from "../events.js";

const main: EventHandler = async function (game: GameObject) {
    // Just a test. Output something to the screen, wait one second, and invoke the same event again

    appendChildren(game.view.content.element, parseHTML("<p>Hi Mom!</p><br>"));

    await delay(1);
    appendChildren(
        game.view.content.element,
        parseHTML("<p>This occurred one second afterwards!</p><br>")
    );
    await delay(1);
};

export default main;
