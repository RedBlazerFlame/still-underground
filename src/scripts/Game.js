// The code organization is based on the Model-View-Controller (MVC) design pattern
import { Store } from "./Store.js";
export class ElementController {
    // Constructor
    constructor({ element }) {
        this.element = element;
        this.eventListeners = [];
    }
    // Methods
    hide() {
        this.element.classList.add("nodisplay");
    }
    show() {
        this.element.classList.remove("nodisplay");
    }
    addEventListener(type, fn, opt) {
        this.eventListeners.push([type, fn, opt]);
        this.element.addEventListener(type, fn, opt);
    }
    removeEventListeners() {
        while (this.eventListeners.length > 0) {
            let curEventListener = this.eventListeners.pop();
            this.element.removeEventListener(...curEventListener);
        }
    }
}
/// A more specific Element Controller for the navigation system
export class NavigatorController extends ElementController {
    // Constructor
    constructor({ container, previousButton, nextButton, }) {
        super({ element: container });
        this.previousButton = previousButton;
        this.nextButton = nextButton;
        this.prevEventListeners = [];
        this.nextEventListeners = [];
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
    /// Handling Event Listeners
    previousAddEventListener(type, fn, opt) {
        this.prevEventListeners.push([type, fn, opt]);
        this.previousButton.addEventListener(type, fn, opt);
    }
    previousRemoveEventListeners() {
        while (this.prevEventListeners.length > 0) {
            let curEventListener = this.prevEventListeners.pop();
            this.previousButton.removeEventListener(...curEventListener);
        }
    }
    nextAddEventListener(type, fn, opt) {
        this.nextEventListeners.push([type, fn, opt]);
        this.nextButton.addEventListener(type, fn, opt);
    }
    nextRemoveEventListeners() {
        while (this.prevEventListeners.length > 0) {
            let curEventListener = this.nextEventListeners.pop();
            this.nextButton.removeEventListener(...curEventListener);
        }
    }
}
/// A controller to modify the title of the site
export class TitleController {
    static set(title) {
        document.title =
            title === "" ? "Still Underground" : `Still Underground | ${title}`;
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
    title: TitleController,
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
