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
import { game } from "./Game.js";
import { delay } from "./asyncHelpers.js";
{
    // Getting a Reference to HTML elements
    const mainMenuButton = document.getElementById("mainMenuButton");
    const startGameButton = document.getElementById("startGameButton");
    const nameForm = document.getElementById("inputs");
    const nameInputIndicator = document.getElementById("nameInputIndicator");
    const nameInput = document.getElementById("nameInput");
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
            game.store.data.username = name;
            window.location.replace("/game");
        }
    }));
}
