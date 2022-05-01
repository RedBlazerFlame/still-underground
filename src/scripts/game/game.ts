// Imports
import { game } from "../Game.js";

// Start the Event Dispatcher
game.dispatcher.activate();

// Dispatch the Current Event that is in the game store
game.dispatcher.dispatch({
    event: game.store.data.event,
    countVisit: false,
});
