import { game } from "./Game.js";

// Declaring Constants and Variables
const hasSave = game.store.data.username !== null;

// Getting a Reference to HTML Elements
const newGameButton: HTMLButtonElement = document.getElementById(
    "newGame"
) as HTMLButtonElement;
const continueButton: HTMLButtonElement = document.getElementById(
    "continue"
) as HTMLButtonElement;
const leaderboardButton: HTMLButtonElement = document.getElementById(
    "leaderboard"
) as HTMLButtonElement;
const acknowledgementsButton: HTMLButtonElement = document.getElementById(
    "acknowledgements"
) as HTMLButtonElement;

// Revealing the Continue Button if the "save" key exists in localStorage
hasSave && continueButton.classList.remove("nodisplay");

// Adding Event Listeners
newGameButton.addEventListener("click", (ev) => {
    if (
        (hasSave &&
            confirm(
                "Are you sure you want to start a new game? Starting a new game will wipe your previous progress."
            )) ||
        !hasSave
    ) {
        window.location.replace("/intro");
    }
});

continueButton.addEventListener("click", (ev) => {
    window.location.replace("/game");
});

leaderboardButton.addEventListener("click", (ev) => {
    window.location.replace("/leaderboard");
});

acknowledgementsButton.addEventListener("click", (ev) => {
    window.location.replace("/acknowledgements");
});
