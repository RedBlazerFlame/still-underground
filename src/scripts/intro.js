var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Imports
import { game, gameStoreInitData } from "./Game.js";
import { delay } from "./asyncHelpers.js";
import { PROGRAM_MODE } from "./mode.js";
{
    // Getting a Reference to HTML elements
    const mainMenuButton = document.getElementById("mainMenuButton");
    const startGameButton = document.getElementById("startGameButton");
    const nameForm = document.getElementById("inputs");
    const nameInputIndicator = document.getElementById("nameInputIndicator");
    const nameInput = document.getElementById("nameInput");
    // If we are on dev mode, insert a name in the name field to avoid having to type a name over and over again when testing
    if (PROGRAM_MODE === "DEV") {
        nameInput.value = "Frisk";
    }
    // Attaching Event Listeners
    mainMenuButton === null || mainMenuButton === void 0 ? void 0 : mainMenuButton.addEventListener("click", (ev) => {
        window.location.replace("/");
    });
    startGameButton === null || startGameButton === void 0 ? void 0 : startGameButton.addEventListener("click", (ev) => __awaiter(void 0, void 0, void 0, function* () {
        let data = Object.fromEntries(new FormData(nameForm).entries());
        let { nameInput: name } = data;
        console.log(name);
        if (name === "") {
            // The inputted name was empty. Raise an error
            nameInputIndicator.textContent = "Please Input a Name";
            nameInputIndicator.classList.add("error");
            nameInputIndicator.classList.remove("hidden");
            yield delay(2);
            nameInputIndicator.classList.add("hidden");
            nameInputIndicator.classList.remove("error");
        }
        else if (name.length > 30) {
            // The inputted name was too long. Raise an error
            nameInputIndicator.textContent = "Please Input a Shorter Name";
            nameInput.value = "";
            nameInputIndicator.classList.add("error");
            nameInputIndicator.classList.remove("hidden");
            yield delay(2);
            nameInputIndicator.classList.add("hidden");
            nameInputIndicator.classList.remove("error");
        }
        else {
            // The inputted name is valid. Set this as the name of the user and start the game
            game.store.set(JSON.parse(JSON.stringify(gameStoreInitData))); // Ensuring that the progress is reset (to prevent cheating*)
            game.store.data.username = name;
            game.store.data.timeStart = Date.now(); // We also need to keep track of the time the player started
            window.location.replace("/game");
            // *Note - Since localStorage can be accessed and edited by the user, we can't stop them from editing the data and cheating, sadly
            // The solution to this is to store the data remotely (i.e., in a database), but that would require some form of
            // user authentication, which is way beyond the scope of the project
        }
    }));
}
