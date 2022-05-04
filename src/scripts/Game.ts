// The code organization is based on the Model-View-Controller (MVC) design pattern

import { delayer, textDisplayer } from "./asyncHelpers.js";
import { eventHandlerMap } from "./game/events.js";
import { Store } from "./Store.js";

// Imports

/*-----------*/
/*CONTROLLERS*/
/*-----------*/

/// A general Element Controller to modify any kind of HTML element
type EventListenerArgs = [
    keyof HTMLElementEventMap,
    (ev: Event) => any,
    boolean | AddEventListenerOptions | undefined
];
export class ElementController<T extends HTMLElement = HTMLElement> {
    // Properties
    element: T; // This is the reference to the HTML Element (view)
    eventListeners: EventListenerArgs[];

    // Methods
    public hide(): void {
        this.element.classList.add("nodisplay");
    }

    public show(): void {
        this.element.classList.remove("nodisplay");
    }

    public center(): void {
        this.element.classList.add("centered");
    }

    public uncenter(): void {
        this.element.classList.remove("centered");
    }

    public addEventListener(
        type: keyof HTMLElementEventMap,
        fn: (ev: Event) => any,
        opt?: boolean | AddEventListenerOptions
    ) {
        this.eventListeners.push([type, fn, opt]);
        this.element.addEventListener(type, fn, opt);
    }

    public removeEventListeners() {
        while (this.eventListeners.length > 0) {
            let curEventListener =
                this.eventListeners.pop() as EventListenerArgs;
            this.element.removeEventListener(...curEventListener);
        }
    }

    // Constructor
    constructor({ element }: { element: T }) {
        this.element = element;
        this.eventListeners = [];
    }
}

/// A more specific Element Controller for the navigation system
export class NavigatorController extends ElementController<HTMLFormElement> {
    // Properties
    previousButton: HTMLInputElement; // This is the reference to the HTML Element (view)
    nextButton: HTMLInputElement; // This is the reference to the HTML Element (view)
    prevEventListeners: EventListenerArgs[];
    nextEventListeners: EventListenerArgs[];

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

    /// Handling Event Listeners
    public previousAddEventListener(
        type: keyof HTMLElementEventMap,
        fn: (ev: Event) => any,
        opt?: boolean | AddEventListenerOptions
    ) {
        this.prevEventListeners.push([type, fn, opt]);
        this.previousButton.addEventListener(type, fn, opt);
    }

    public previousRemoveEventListeners() {
        while (this.prevEventListeners.length > 0) {
            let curEventListener =
                this.prevEventListeners.pop() as EventListenerArgs;
            this.previousButton.removeEventListener(...curEventListener);
        }
    }

    public nextAddEventListener(
        type: keyof HTMLElementEventMap,
        fn: (ev: Event) => any,
        opt?: boolean | AddEventListenerOptions
    ) {
        this.nextEventListeners.push([type, fn, opt]);
        this.nextButton.addEventListener(type, fn, opt);
    }

    public nextRemoveEventListeners() {
        while (this.nextEventListeners.length > 0) {
            let curEventListener =
                this.nextEventListeners.pop() as EventListenerArgs;
            this.nextButton.removeEventListener(...curEventListener);
        }
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
        this.prevEventListeners = [];
        this.nextEventListeners = [];
    }
}

/// A controller to modify the title of the site
export class TitleController {
    set(title: string) {
        document.title =
            title === "" ? "Still Underground" : `Still Underground | ${title}`;
    }

    constructor() {}
}

// The view object combines all of the Element Controllers for easy access
export type ViewControllers = {
    content: ElementController;
    controls: ElementController<HTMLFormElement>;
    navigator: NavigatorController;
    title: TitleController;
    reset: () => void;
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
    title: new TitleController(),
    reset() {
        this.content.element.innerHTML = "";
        this.controls.element.innerHTML = "";
        this.navigator.show();
        this.navigator.showNext();
        this.navigator.showPrev();
        this.controls.center();
    },
};

/*-----*/
/*MODEL*/
/*-----*/

// Create the Store for the Game Data
type DoorState = "OPEN" | "CLOSED";
export type GameStoreData = {
    username: null | string;
    timeStart: number;
    event: string;
    animatingRoomDoorState: DoorState;
    recordingStudioDoorState: DoorState;
    animatorQuartersLock1: DoorState;
    animatorQuartersLocks2And3: DoorState;
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

export const gameStoreInitData: GameStoreData = {
    username: null,
    timeStart: 0,
    event: "start-1",
    animatingRoomDoorState: "CLOSED",
    recordingStudioDoorState: "CLOSED",
    animatorQuartersLock1: "CLOSED",
    animatorQuartersLocks2And3: "CLOSED",
    ending: null,
    visits: {
        "start-1": 1,
    },
};

const gameStore = new GameStore({
    targetObj: JSON.parse(JSON.stringify(gameStoreInitData)), // Creating a copy so that the original object is not mutated
    key: "save",
});

/*----------------*/
/*EVENT DISPATCHER*/
/*----------------*/

export type DispatchedEventData = {
    event: string;
    countVisit?: boolean;
    changeCurrentEvent?: boolean;
    changeTitle?: boolean;
    resetView?: boolean;
    makeDelaysInstant?: boolean;
    clearEventListeners?: boolean;
};

// The event dispatcher is a class that runs event callbacks
// This allows us to get around the call stack limit
// The disadvantage of this approach is that it is more computationally expensive since the code is called every animation frame
class EventDispatcher {
    // Properties
    private __eventQueue: DispatchedEventData[];
    private __gameObject: GameObject;

    // Methods
    private async __mainLoop() {
        // This code will run every animation frame once the event dispatcher is activated
        // The code checks if there is an event in the event queue and runs it
        let currentEvent = this.__eventQueue.shift();

        if (currentEvent !== undefined) {
            const currentEventCallback = eventHandlerMap.get(
                currentEvent.event
            );

            if (
                (currentEvent.countVisit ?? true) &&
                currentEventCallback !== undefined
            ) {
                this.__gameObject.store.data.visits[currentEvent.event] += 1;
            }
            if (
                (currentEvent.changeCurrentEvent ?? true) &&
                currentEventCallback !== undefined
            ) {
                this.__gameObject.store.data.event = currentEvent.event;
            }
            if (
                (currentEvent.changeTitle ?? true) &&
                currentEventCallback !== undefined
            ) {
                this.__gameObject.view.title.set(currentEvent.event);
            }

            if (
                (currentEvent.resetView ?? true) &&
                currentEventCallback !== undefined
            ) {
                this.__gameObject.view.reset();
            }

            if (
                (currentEvent.makeDelaysInstant ?? true) &&
                currentEventCallback !== undefined
            ) {
                if (
                    this.__gameObject.store.data.visits[currentEvent.event] <= 1
                ) {
                    textDisplayer.instant(false);
                    delayer.instant(false);
                } else {
                    textDisplayer.instant(true);
                    delayer.instant(true);
                }
            }

            if (
                (currentEvent.clearEventListeners ?? true) &&
                currentEventCallback !== undefined
            ) {
                this.__gameObject.view.content.removeEventListeners();
                this.__gameObject.view.controls.removeEventListeners();
                this.__gameObject.view.navigator.removeEventListeners();
                this.__gameObject.view.navigator.nextRemoveEventListeners();
                this.__gameObject.view.navigator.previousRemoveEventListeners();
            }
            currentEventCallback !== undefined &&
                (await currentEventCallback(this.__gameObject));
        }

        requestAnimationFrame(this.__mainLoop.bind(this));
    }

    public activate() {
        // This function starts the main loop
        // The reason why we don't want the event dispatcher to automatically start is because we don't need to activate it for pages like the main menu

        requestAnimationFrame(this.__mainLoop.bind(this));
    }

    public dispatch(eventData: DispatchedEventData) {
        // This function dispatches an event
        this.__eventQueue.push(eventData);
    }

    // Constructor
    constructor(gameObject: GameObject) {
        this.__eventQueue = [];
        this.__gameObject = gameObject;
    }
}

/*-----------*/
/*GAME OBJECT*/
/*-----------*/
export type GameObject = {
    store: GameStore;
    view: ViewControllers;
    dispatcher: EventDispatcher;
};

const gameWithoutDispatch: Pick<GameObject, "store" | "view"> = {
    store: gameStore,
    view,
};

// Linking the Event Dispatcher to the game object
// Note that, in this case, we create a circular reference
// This is no problem because we never serialize the full game object, just the game store data
const game: GameObject = gameWithoutDispatch as GameObject;
game.dispatcher = new EventDispatcher(game as GameObject);

export { game };
