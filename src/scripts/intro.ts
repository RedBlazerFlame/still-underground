// Imports
// TODO import game from "./Game.js";
// TODO create the main store for the game data

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
            // The inputted name is valid. Do some preprocessing before starting the game
        }
        // window.location.replace("/game");
    });
}
