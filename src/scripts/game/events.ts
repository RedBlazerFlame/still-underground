// An event, in this case, is just a set of code that runs based on the game state
// Events can invoke other events
// Implementation-wise, events are just implemented using callbacks

import { GameObject } from "../Game.js";
import start1 from "./events/start-1.js";

// Imports

// Declaring Types
export type EventHandler = (game: GameObject) => Promise<void>;

export type EventHandlerMap = Map<string, EventHandler>;

// Creating the Event Handler Map
export const eventHandlerMap = new Map([["start-1", start1]]);
