// The code organization is based on the Model-View-Controller (MVC) design pattern
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { delayer, textDisplayer } from "./asyncHelpers.js";
import { eventHandlerMap } from "./game/events.js";
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
    set(title) {
        document.title =
            title === "" ? "Still Underground" : `Still Underground | ${title}`;
    }
    constructor() { }
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
    title: new TitleController(),
    reset() {
        this.content.element.innerHTML = "";
        this.controls.element.innerHTML = "";
        this.navigator.show();
        this.navigator.showNext();
        this.navigator.showPrev();
    },
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
export const gameStoreInitData = {
    username: null,
    timeStart: 0,
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
    targetObj: JSON.parse(JSON.stringify(gameStoreInitData)),
    key: "save",
});
// The event dispatcher is a class that runs event callbacks
// This allows us to get around the call stack limit
// The disadvantage of this approach is that it is more computationally expensive since the code is called every animation frame
class EventDispatcher {
    // Constructor
    constructor(gameObject) {
        this.__eventQueue = [];
        this.__gameObject = gameObject;
    }
    // Methods
    __mainLoop() {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            // This code will run every animation frame once the event dispatcher is activated
            // The code checks if there is an event in the event queue and runs it
            let currentEvent = this.__eventQueue.shift();
            if (currentEvent !== undefined) {
                const currentEventCallback = eventHandlerMap.get(currentEvent.event);
                if (((_a = currentEvent.countVisit) !== null && _a !== void 0 ? _a : true) &&
                    currentEventCallback !== undefined) {
                    this.__gameObject.store.data.visits[currentEvent.event] += 1;
                }
                if (((_b = currentEvent.changeCurrentEvent) !== null && _b !== void 0 ? _b : true) &&
                    currentEventCallback !== undefined) {
                    this.__gameObject.store.data.event = currentEvent.event;
                }
                if (((_c = currentEvent.changeTitle) !== null && _c !== void 0 ? _c : true) &&
                    currentEventCallback !== undefined) {
                    this.__gameObject.view.title.set(currentEvent.event);
                }
                if (((_d = currentEvent.resetView) !== null && _d !== void 0 ? _d : true) &&
                    currentEventCallback !== undefined) {
                    this.__gameObject.view.reset();
                }
                if (((_e = currentEvent.makeDelaysInstant) !== null && _e !== void 0 ? _e : true) &&
                    currentEventCallback !== undefined) {
                    if (this.__gameObject.store.data.visits[currentEvent.event] ===
                        1) {
                        textDisplayer.instant(false);
                        delayer.instant(false);
                    }
                    else {
                        textDisplayer.instant(true);
                        delayer.instant(true);
                    }
                }
                currentEventCallback !== undefined &&
                    (yield currentEventCallback(this.__gameObject));
            }
            requestAnimationFrame(this.__mainLoop.bind(this));
        });
    }
    activate() {
        // This function starts the main loop
        // The reason why we don't want the event dispatcher to automatically start is because we don't need to activate it for pages like the main menu
        requestAnimationFrame(this.__mainLoop.bind(this));
    }
    dispatch(eventData) {
        // This function dispatches an event
        this.__eventQueue.push(eventData);
    }
}
const gameWithoutDispatch = {
    store: gameStore,
    view,
};
// Linking the Event Dispatcher to the game object
// Note that, in this case, we create a circular reference
// This is no problem because we never serialize the full game object, just the game store data
const game = gameWithoutDispatch;
game.dispatcher = new EventDispatcher(game);
export { game };
