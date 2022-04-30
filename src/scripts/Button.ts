// This script ensures that buttons are unfocused after they are clicked

{
    let buttons: NodeListOf<HTMLElement> = document.querySelectorAll(
        "button, input[type=Button]"
    );
    buttons.forEach((button) => {
        button.addEventListener("click", (ev) => {
            button.blur();
        });
    });
}
