import { el } from "../../aliases.js";
import { delay, delayer, textDisplayer } from "../../asyncHelpers.js";
import { appendChildren, parseHTML } from "../../domHelpers.js";
import { GameObject } from "../../Game.js";
import { EventHandler } from "../events.js";

const main: EventHandler = async function (game: GameObject) {
    // Preprocessing
    game.view.navigator.hide();

    // TODO Storing Best Times

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
