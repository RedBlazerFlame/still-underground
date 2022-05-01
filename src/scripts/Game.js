// The code organization is based on the Model-View-Controller (MVC) design pattern
import { Store } from "./Store.js";
// Imports
/*-----------*/
/*CONTROLLERS*/
/*-----------*/
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
export const view = {
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
export class GameStore extends Store {
    /// This method ensures that all sub-objects are also wrapped in a proxy
    proxify() {
        this.data.visits = new Proxy(this.data.visits, {
            set: (o, p, v, r) => {
                let res = Reflect.set(o, p, v, r);
                localStorage.setItem(this.key, JSON.stringify(this.data));
                return res;
            },
            get: (o, p, r) => {
                let res = Reflect.get(o, p, r);
                res === undefined && Reflect.set(o, p, 0); // If the property does not exist yet, but is accessed, create the property and set the value to zero
                return res !== null && res !== void 0 ? res : 0;
            },
        });
    }
    // Constructor
    constructor({ targetObj, key }) {
        super({
            targetObj,
            key,
        });
    }
}
const gameStoreInitData = {
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
export const game = {
    store: gameStore,
    view,
};
