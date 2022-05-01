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
        let visitedRecordingStudio = game.store.data.visits["recording-studio-1"] > 0;
        // Display the text
        if (game.store.data.animatingRoomDoorState === "CLOSED") {
            let p1 = el("p");
            game.view.content.element.appendChild(p1);
            yield textDisplayer.displayAsynchronously({
                e: p1,
                text: "You notice a locked door on the left.",
                delay: 0.05,
            });
            yield delayer.delay(0.4);
            yield textDisplayer.displayAsynchronously({
                e: p1,
                text: " Where is the key, though?",
                delay: 0.05,
            });
            p1.appendChild(el("br"));
            yield delayer.delay(1);
            yield textDisplayer.displayAsynchronously({
                e: p1,
                text: "You inspect the computers for clues.",
                delay: 0.05,
            });
            yield delayer.delay(0.4);
            yield textDisplayer.displayAsynchronously({
                e: p1,
                text: " You notice one of the computers is not running animating software and is instead displaying something else",
                delay: 0.05,
            });
            yield textDisplayer.displayAsynchronously({
                e: p1,
                text: "...",
                delay: 0.2,
            });
            yield delayer.delay(1);
        }
        else {
            let p1 = el("p");
            game.view.content.element.appendChild(p1);
            if (visitedRecordingStudio) {
                yield textDisplayer.displayAsynchronously({
                    e: p1,
                    text: "You're back in the animating room.",
                    delay: 0.05,
                });
            }
            else {
                yield textDisplayer.displayAsynchronously({
                    e: p1,
                    text: "The door is open, ",
                    delay: 0.05,
                });
                yield delayer.delay(0.4);
                yield textDisplayer.displayAsynchronously({
                    e: p1,
                    text: " but you decide to stay in the room for now.",
                    delay: 0.05,
                });
            }
            if (game.store.data.animatorQuartersLock1 === "CLOSED") {
                p1.appendChild(el("br"));
                yield delayer.delay(1);
                yield textDisplayer.displayAsynchronously({
                    e: p1,
                    text: "Perhaps the computer holds more clues?",
                    delay: 0.05,
                });
            }
            yield delayer.delay(1);
        }
        // Create controls
        yield new Promise((r) => {
            if (visitedRecordingStudio) {
                let gotoRecordingStudio = parseHTML("<input class='margin-12px' type='button' form='controls' value='Recording Studio'>")[0];
                game.view.controls.element.appendChild(gotoRecordingStudio);
                gotoRecordingStudio.addEventListener("click", (ev) => {
                    game.dispatcher.dispatch({
                        event: "recording-studio-1",
                    });
                    r(undefined);
                });
            }
            else {
                let inspectDoor = parseHTML("<input class='margin-12px' type='button' form='controls' value='Inspect the Door'>")[0];
                game.view.controls.element.appendChild(inspectDoor);
                inspectDoor.addEventListener("click", (ev) => {
                    game.dispatcher.dispatch({
                        event: "animating-room-inspect-door",
                    });
                    r(undefined);
                });
            }
            let inspectComputer = parseHTML("<input class='margin-12px' type='button' form='controls' value='Inspect the Computer'>")[0];
            game.view.controls.element.appendChild(inspectComputer);
            inspectComputer.addEventListener("click", (ev) => {
                game.dispatcher.dispatch({
                    event: "animating-room-computer",
                });
                r(undefined);
            });
        });
    });
};
export default main;
