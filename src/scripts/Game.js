// The code organization is based on the Model-View-Controller (MVC) design pattern
// Controllers
/// A general Element Controller to modify any kind of HTML element
export class ElementController {
    // Constructor
    constructor({ element }) {
        this.element = element;
    }
    // Methods
    hide() {
        this.element.classList.add("nodisplay");
    }
    show() {
        this.element.classList.remove("nodisplay");
    }
}
/// A more specific Element Controller for the navigation system
export class NavigatorController extends ElementController {
    // Constructor
    constructor({ container, previousButton, nextButton, }) {
        super({ element: container });
        this.previousButton = previousButton;
        this.nextButton = nextButton;
    }
    // Methods
    hidePrev() {
        this.previousButton.classList.add("nodisplay");
    }
    showPrev() {
        this.previousButton.classList.remove("nodisplay");
    }
    hideNext() {
        this.nextButton.classList.add("nodisplay");
    }
    showNext() {
        this.nextButton.classList.remove("nodisplay");
    }
}
const view = {
    content: new ElementController({
        element: document.getElementById("content"),
    }),
    controls: new ElementController({
        element: document.getElementById("controls"),
    }),
    navigator: new NavigatorController({
        container: document.getElementById("navigator"),
        previousButton: document.getElementById("previousButton"),
        nextButton: document.getElementById("nextButton"),
    }),
};
// TODO Create the Store for the Game Data
// TODO Create the Game Object
