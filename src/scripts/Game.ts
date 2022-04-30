// The code organization is based on the Model-View-Controller (MVC) design pattern

// Controllers
/// A general Element Controller to modify any kind of HTML element
export class ElementController<T extends HTMLElement = HTMLElement> {
    // Properties
    element: T; // This is the reference to the HTML Element (view)

    // Methods
    public hide(): void {
        this.element.classList.add("nodisplay");
    }

    public show(): void {
        this.element.classList.remove("nodisplay");
    }

    // Constructor
    constructor({ element }: { element: T }) {
        this.element = element;
    }
}

/// A more specific Element Controller for the navigation system
export class NavigatorController extends ElementController<HTMLFormElement> {
    // Properties
    previousButton: HTMLInputElement; // This is the reference to the HTML Element (view)
    nextButton: HTMLInputElement; // This is the reference to the HTML Element (view)

    // Methods
    public hidePrev(): void {
        this.previousButton.classList.add("nodisplay");
    }

    public showPrev(): void {
        this.previousButton.classList.remove("nodisplay");
    }

    public hideNext(): void {
        this.nextButton.classList.add("nodisplay");
    }

    public showNext(): void {
        this.nextButton.classList.remove("nodisplay");
    }

    // Constructor
    constructor({
        container,
        previousButton,
        nextButton,
    }: {
        container: HTMLFormElement;
        previousButton: HTMLInputElement;
        nextButton: HTMLInputElement;
    }) {
        super({ element: container });

        this.previousButton = previousButton;
        this.nextButton = nextButton;
    }
}

// The view object combines all of the Element Controllers for easy access
export type ViewControllers = {
    content: ElementController;
    controls: ElementController<HTMLFormElement>;
    navigator: NavigatorController;
};

const view: ViewControllers = {
    content: new ElementController({
        element: document.getElementById("content") as HTMLElement,
    }),
    controls: new ElementController({
        element: document.getElementById("controls") as HTMLFormElement,
    }),
    navigator: new NavigatorController({
        container: document.getElementById("navigator") as HTMLFormElement,
        previousButton: document.getElementById(
            "previousButton"
        ) as HTMLInputElement,
        nextButton: document.getElementById("nextButton") as HTMLInputElement,
    }),
};

// TODO Create the Store for the Game Data

// TODO Create the Game Object
