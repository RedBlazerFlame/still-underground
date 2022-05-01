// The code organization is based on the Model-View-Controller (MVC) design pattern

import { Store } from "./Store.js";

// Imports

/*-----------*/
/*CONTROLLERS*/
/*-----------*/

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

export const view: ViewControllers = {
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

/*-----*/
/*MODEL*/
/*-----*/

// Create the Store for the Game Data
type DoorState = "OPEN" | "CLOSED";
export type GameStoreData = {
    username: null | string;
    event: string;
    animatingRoomDoorState: DoorState;
    animatorQuartersLock1: DoorState;
    animatorQuartersLock2: DoorState;
    animatorQuartersLock3: DoorState;
    ending: null | "BAD" | "NEUTRAL" | "GOOD";
    visits: {
        [key: string]: number;
    } /* This is for tracking the number of times the player has gone through an event */;
    [key: string]: null | number | string | Object;
};

export class GameStore extends Store<GameStoreData> {
    /// This method ensures that all sub-objects are also wrapped in a proxy
    public proxify() {
        this.data.visits = new Proxy(this.data.visits, {
            set: (o, p, v, r) => {
                let res = Reflect.set(o, p, v, r);
                localStorage.setItem(this.key, JSON.stringify(this.data));
                return res;
            },
            get: (o, p, r) => {
                let res = Reflect.get(o, p, r);
                res === undefined && Reflect.set(o, p, 0); // If the property does not exist yet, but is accessed, create the property and set the value to zero
                return res ?? 0;
            },
        });
    }

    // Constructor
    constructor({ targetObj, key }: { targetObj: GameStoreData; key: string }) {
        super({
            targetObj,
            key,
        });
    }
}

const gameStoreInitData: GameStoreData = {
    username: null,
    event: "start-1",
    animatingRoomDoorState: "CLOSED",
    animatorQuartersLock1: "CLOSED",
    animatorQuartersLock2: "CLOSED",
    animatorQuartersLock3: "CLOSED",
    ending: null,
    visits: {
        "start-1": 1,
    },
};

const gameStore = new GameStore({
    targetObj: gameStoreInitData,
    key: "save",
});

/*-----------*/
/*GAME OBJECT*/
/*-----------*/
type GameObject = {
    store: GameStore;
    view: ViewControllers;
};

export const game: GameObject = {
    store: gameStore,
    view,
};
