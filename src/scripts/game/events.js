// An event, in this case, is just a set of code that runs based on the game state
// Events can invoke other events
// Implementation-wise, events are just implemented using callbacks
import start1 from "./events/start-1.js";
import start2 from "./events/start-2.js";
import start3 from "./events/start-3.js";
import start4 from "./events/start-4.js";
import animatingRoom1 from "./events/animating-room-1.js";
import animatingRoomInspectDoor from "./events/animating-room-inspect-door.js";
// Creating the Event Handler Map
export const eventHandlerMap = new Map([
    ["start-1", start1],
    ["start-2", start2],
    ["start-3", start3],
    ["start-4", start4],
    ["animating-room-1", animatingRoom1],
    ["animating-room-inspect-door", animatingRoomInspectDoor],
]);
