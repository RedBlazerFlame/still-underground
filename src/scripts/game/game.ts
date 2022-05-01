// Imports
import { game } from "../Game.js";

// If the user hasn't created a username yet, redirect them to the main menu
if (game.store.data.username === null) {
    window.location.replace("/");
} else {
    // Start the Event Dispatcher
    game.dispatcher.activate();

    // Dispatch the Current Event that is in the game store
    game.dispatcher.dispatch({
        event: game.store.data.event,
        countVisit: false,
    });
}
