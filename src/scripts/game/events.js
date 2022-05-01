// An event, in this case, is just a set of code that runs based on the game state
// Events can invoke other events
// Implementation-wise, events are just implemented using callbacks
import start1 from "./events/start-1.js";
// Creating the Event Handler Map
export const eventHandlerMap = new Map([["start-1", start1]]);
