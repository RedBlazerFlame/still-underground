"use strict";
// This script ensures that buttons are unfocused after they are clicked
{
    let buttons = document.querySelectorAll("button, input[type=button], input[type=submit], input[type=reset]");
    buttons.forEach((button) => {
        button.addEventListener("click", (ev) => {
            button.blur();
        });
    });
}
