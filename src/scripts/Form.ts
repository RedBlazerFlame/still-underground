// This script ensures that forms with the class nosubmit do not submit

{
    let forms: NodeListOf<HTMLElement> =
        document.querySelectorAll("form.nosubmit");
    forms.forEach((form) => {
        form.addEventListener("submit", (ev) => {
            ev.preventDefault();
        });
    });
}
