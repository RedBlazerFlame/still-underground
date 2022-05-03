// Imports
import { game, gameStoreInitData } from "./Game.js";

import { delay } from "./asyncHelpers.js";
import { PROGRAM_MODE } from "./mode.js";

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

    // If we are on dev mode, insert a name in the name field to avoid having to type a name over and over again when testing

    if (PROGRAM_MODE === "DEV") {
        nameInput.value = "Frisk";
    }

    // Attaching Event Listeners
    mainMenuButton?.addEventListener("click", (ev) => {
        window.location.replace("/");
    });

    nameInput.addEventListener("blur", (ev) => {
        let name = (ev.target as HTMLTextAreaElement).value;

        if (name === "") {
            // The inputted name was empty. Raise an error
            nameInputIndicator.textContent = "Please Input a Name";
            nameInputIndicator.classList.add("error");
            nameInputIndicator.classList.remove("hidden");
        } else if (name.length > 30) {
            // The inputted name was too long. Raise an error
            nameInputIndicator.textContent = "Please Input a Shorter Name";
            nameInputIndicator.classList.add("error");
            nameInputIndicator.classList.remove("hidden");
        }
    });

    nameInput.addEventListener("focus", (ev) => {
        nameInputIndicator.classList.add("hidden");
        nameInputIndicator.classList.remove("error");
    });

    startGameButton?.addEventListener("click", async (ev) => {
        let data = Object.fromEntries(new FormData(nameForm).entries());
        let { nameInput: name } = data as { nameInput: string };

        if (name === "") {
            // The inputted name was empty. Raise an error
            nameInputIndicator.textContent = "Please Input a Name";
            nameInputIndicator.classList.add("error");
            nameInputIndicator.classList.remove("hidden");
        } else if (name.length > 30) {
            // The inputted name was too long. Raise an error
            nameInputIndicator.textContent = "Please Input a Shorter Name";
            nameInputIndicator.classList.add("error");
            nameInputIndicator.classList.remove("hidden");
        } else {
            // The inputted name is valid. Set this as the name of the user and start the game
            game.store.set(JSON.parse(JSON.stringify(gameStoreInitData))); // Ensuring that the progress is reset (to prevent cheating*)
            game.store.data.username = name;
            game.store.data.timeStart = Date.now(); // We also need to keep track of the time the player started
            window.location.replace("/game");

            // *Note - Since localStorage can be accessed and edited by the user, we can't stop them from editing the data and cheating, sadly
            // The solution to this is to store the data remotely (i.e., in a database), but that would require some form of
            // user authentication, which is way beyond the scope of the project
        }
    });
}
