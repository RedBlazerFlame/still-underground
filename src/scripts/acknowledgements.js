"use strict";
// Getting a Reference to HTML elements
const mainMenuButton = document.getElementById("mainMenuButton");
// Attaching event listeners
mainMenuButton === null || mainMenuButton === void 0 ? void 0 : mainMenuButton.addEventListener("click", (ev) => {
    window.location.replace("/");
});
