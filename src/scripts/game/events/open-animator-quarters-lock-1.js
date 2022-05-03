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
const main = function (game) {
    return __awaiter(this, void 0, void 0, function* () {
        // Preprocessing
        game.view.navigator.hidePrev();
        game.store.data.animatorQuartersLock1 = "OPEN";
        // Text
        let p1 = el("p");
        game.view.content.element.appendChild(p1);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: "The computer informs you that your answer was correct. ",
            delay: 0.05,
        });
        yield delayer.delay(0.4);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: "You hear something fall in the distance. ",
            delay: 0.05,
        });
        yield delayer.delay(0.4);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: "What could that be?",
            delay: 0.05,
        });
        yield delayer.delay(1);
        // Setting up controls
        yield new Promise((r) => {
            game.view.navigator.nextAddEventListener("click", (ev) => {
                game.dispatcher.dispatch({
                    event: "animating-room-1",
                });
                r(null);
            });
        });
    });
};
export default main;
