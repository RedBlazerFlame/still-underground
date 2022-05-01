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
        // Updating the View
        game.view.navigator.hidePrev();
        game.view.navigator.hideNext();
        // Main Story
        let p1 = el("p");
        game.view.content.element.appendChild(p1);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: `The investigation was going well until you suddenly fall into a hole! You get up and see multiple computers with animating software open. You look at the wall and see a poster...`,
            delay: 0.05,
        });
        yield delayer.delay(0.5);
        // Show Buttons
        game.view.navigator.showNext();
        game.view.navigator.showPrev();
        yield new Promise((r) => {
            game.view.navigator.nextAddEventListener("click", (ev) => {
                game.dispatcher.dispatch({
                    event: "start-4",
                });
                r(undefined);
            });
            game.view.navigator.previousAddEventListener("click", (ev) => {
                game.dispatcher.dispatch({
                    event: "start-2",
                });
                r(undefined);
            });
        });
    });
};
export default main;
