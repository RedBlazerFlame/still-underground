var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { el } from "../../aliases.js";
import { delayer, textDisplayer } from "../../asyncHelpers.js";
import { parseHTML } from "../../domHelpers.js";
const main = function (game) {
    return __awaiter(this, void 0, void 0, function* () {
        // Preprocessing
        game.view.navigator.hide();
        let doorIsOpen = game.store.data.animatingRoomDoorState === "OPEN";
        // Display the text
        let p1 = el("p");
        game.view.content.element.appendChild(p1);
        if (doorIsOpen) {
            yield textDisplayer.displayAsynchronously({
                e: p1,
                text: "The door is open.",
                delay: 0.05,
            });
            yield delayer.delay(0.4);
            yield textDisplayer.displayAsynchronously({
                e: p1,
                text: " Do you want to go to the next room?",
                delay: 0.05,
            });
            yield delayer.delay(1);
        }
        else {
            yield textDisplayer.displayAsynchronously({
                e: p1,
                text: "The door is closed.",
                delay: 0.05,
            });
            yield delayer.delay(0.4);
            yield textDisplayer.displayAsynchronously({
                e: p1,
                text: " Perhaps something else will open it?",
                delay: 0.05,
            });
            yield delayer.delay(1);
        }
        // Create the Controls
        yield new Promise((r) => {
            if (doorIsOpen) {
                let walkThroughDoor = parseHTML("<input class='margin-12px' type='button' form='controls' value='Walk through the Door'>")[0];
                game.view.controls.element.appendChild(walkThroughDoor);
                walkThroughDoor.addEventListener("click", (ev) => {
                    game.dispatcher.dispatch({
                        event: "recording-studio-1",
                    });
                    r(undefined);
                });
            }
            let backToAnimatingRoom = parseHTML(`<input class='margin-12px' type='button' form='controls' value='Go Back'>`)[0];
            game.view.controls.element.appendChild(backToAnimatingRoom);
            backToAnimatingRoom.addEventListener("click", (ev) => {
                game.dispatcher.dispatch({
                    event: "animating-room-1",
                });
                r(undefined);
            });
        });
    });
};
export default main;
