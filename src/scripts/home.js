"use strict";
// Declaring Constants and Variables
const hasSave = localStorage.getItem("save") !== null;
// Getting a Reference to HTML Elements
const newGameButton = document.getElementById("newGame");
const continueButton = document.getElementById("continue");
const leaderboardButton = document.getElementById("leaderboard");
const acknowledgementsButton = document.getElementById("acknowledgements");
// Revealing the Continue Button if the "save" key exists in localStorage
hasSave && continueButton.classList.remove("nodisplay");
// Adding Event Listeners
newGameButton.addEventListener("click", (ev) => {
    if ((hasSave &&
        confirm("Are you sure you want to start a new game? Starting a new game will wipe your previous progress.")) ||
        !hasSave) {
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
