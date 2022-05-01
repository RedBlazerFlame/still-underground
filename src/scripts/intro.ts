// Imports
import { game } from "./Game.js";

import { delay } from "./asyncHelpers.js";

{
    // Getting a Reference to HTML elements
    const mainMenuButton = document.getElementById("mainMenuButton");
    const startGameButton = document.getElementById("startGameButton");
    const nameForm = document.getElementById("inputs") as HTMLFormElement;
    const nameInputIndicator = document.getElementById(
        "nameInputIndicator"
    ) as HTMLParagraphElement;
    const nameInput = document.getElementById(
        "nameInput"
    ) as HTMLTextAreaElement;

    // Attaching Event Listeners
    mainMenuButton?.addEventListener("click", (ev) => {
        window.location.replace("/");
    });

    startGameButton?.addEventListener("click", async (ev) => {
        let data = Object.fromEntries(new FormData(nameForm).entries());
        let { nameInput: name } = data as { nameInput: string };
        console.log(name);

        if (name === "") {
            // The inputted name was empty. Raise an error
            nameInputIndicator.textContent = "Please Input a Name";
            nameInputIndicator.classList.add("error");
            nameInputIndicator.classList.remove("hidden");
            await delay(2);
            nameInputIndicator.classList.add("hidden");
            nameInputIndicator.classList.remove("error");
        } else if (name.length > 30) {
            // The inputted name was too long. Raise an error
            nameInputIndicator.textContent = "Please Input a Shorter Name";
            nameInput.value = "";
            nameInputIndicator.classList.add("error");
            nameInputIndicator.classList.remove("hidden");
            await delay(2);
            nameInputIndicator.classList.add("hidden");
            nameInputIndicator.classList.remove("error");
        } else {
            // The inputted name is valid. Set this as the name of the user and start the game
            game.store.data.username = name;
            window.location.replace("/game");
        }
    });
}
