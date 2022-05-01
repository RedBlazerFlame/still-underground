import { delay, delayer, textDisplayer } from "../../asyncHelpers.js";
import { appendChildren, parseHTML } from "../../domHelpers.js";
import { GameObject } from "../../Game.js";
import { EventHandler } from "../events.js";

// The code here is just a test to get myself comfortable with the set-up
const main: EventHandler = async function (game: GameObject) {
    // Paragraph 1

    let par1 = document.createElement("p");

    game.view.content.element.appendChild(par1);

    await textDisplayer.displayAsynchronously({
        e: par1,
        text: "Hi Mom!",
        delay: 0.05,
    });

    await delayer.delay(1);

    // Paragraph 2

    let par2 = document.createElement("p");

    game.view.content.element.appendChild(par2);

    await textDisplayer.displayAsynchronously({
        e: par2,
        text: "This occurred one second afterwards!",
        delay: 0.05,
    });

    await delayer.delay(2);

    // Cat Image

    let catImage = document.createElement("img") as HTMLImageElement;

    catImage.src =
        "https://4.bp.blogspot.com/-_vTDmo_fSTw/T3YTV0AfGiI/AAAAAAAAAX4/Zjh2HaoU5Zo/s1600/beautiful%2Bkitten.jpg";

    catImage.style.width = "20vw";

    game.view.content.element.appendChild(catImage);

    await delayer.delay(1);

    // Question

    let question = document.createElement("p");

    game.view.content.element.appendChild(question);

    await textDisplayer.displayAsynchronously({
        e: question,
        text: "Will you pet the cat?",
        delay: 0.05,
    });

    await delayer.delay(1);

    let yesButton = document.createElement("button");
    let noButton = document.createElement("button");

    yesButton.textContent = "YES OF COURSE!";
    noButton.textContent = "No.";

    yesButton.classList.add("margin-12px");
    noButton.classList.add("margin-12px");

    appendChildren(game.view.controls.element, [yesButton, noButton]);

    let par3 = document.createElement("p");

    game.view.content.element.appendChild(par3);

    const catStatus = await new Promise((res) => {
        yesButton.addEventListener("click", async (ev) => {
            await textDisplayer.displayAsynchronously({
                e: par3,
                text: "M E O W",
                delay: 0.25,
            });

            res({
                catStatus: "petted",
            });
        });

        noButton.addEventListener("click", async (ev) => {
            await textDisplayer.displayAsynchronously({
                e: par3,
                text: "You made the cat cry...",
                delay: 0.05,
            });

            res({
                catStatus: "not petted",
            });
        });
    });

    await delay(1);

    if (catStatus.catStatus == "petted") {
        let par4 = document.createElement("p");
        par4.textContent =
            "You're a good human so I won't put you in a time loop :D";

        game.view.content.element.appendChild(par4);
        return;
    }

    // Now do the event again!
    let par4 = document.createElement("p");
    par4.textContent = "HAHA NOW YOU ARE STUCK IN A TIME LOOP";

    game.view.content.element.appendChild(par4);

    await delay(2);

    par4.textContent = "";

    await textDisplayer.displayAsynchronously({
        e: par4,
        text: "Time Loop In.",
        delay: 0.05,
    });

    await textDisplayer.displayAsynchronously({
        e: par4,
        text: ".. ",
        delay: 0.25,
    });

    let par5 = document.createElement("p");

    game.view.content.element.appendChild(par5);

    par5.textContent = "3";

    await delay(1);

    par5.textContent = "2";

    await delay(1);

    par5.textContent = "1";

    await delay(1);

    game.dispatcher.dispatch({
        event: "start-1",
    });
};

export default main;
