// Getting a Reference to HTML elements
const mainMenuButton = document.getElementById("mainMenuButton");

// Attaching event listeners
mainMenuButton?.addEventListener("click", (ev) => {
    window.location.replace("/");
});
