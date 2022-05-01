"use strict";
// This script ensures that forms with the class nosubmit do not submit
{
    let forms = document.querySelectorAll("form.nosubmit");
    forms.forEach((form) => {
        form.addEventListener("submit", (ev) => {
            ev.preventDefault();
        });
    });
}
