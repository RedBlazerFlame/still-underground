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
import { appendChildren, parseHTML } from "../../domHelpers.js";
const main = function (game) {
    return __awaiter(this, void 0, void 0, function* () {
        // Preprocessing
        game.view.navigator.hidePrev();
        game.view.navigator.hideNext();
        game.store.data.ending = "GOOD";
        // Displaying text and other plot elements
        let p1 = el("p");
        game.view.content.element.appendChild(p1);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: "STILL UNDERGROUND DEMO",
            delay: 0.05,
        });
        appendChildren(p1, [el("br"), el("br")]);
        yield delayer.delay(1);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: "This game is a work in progress.",
            delay: 0.05,
        });
        appendChildren(p1, [el("br"), el("br")]);
        yield delayer.delay(1);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: "More content will be added soon.",
            delay: 0.05,
        });
        appendChildren(p1, [el("br"), el("br")]);
        yield delayer.delay(1);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: "Thanks for playing!",
            delay: 0.05,
        });
        appendChildren(p1, [el("br"), el("br")]);
        yield delayer.delay(1);
        /// THE END (Temporary Ending)
        let p4 = el("p");
        game.view.content.element.appendChild(p4);
        yield textDisplayer.displayAsynchronously({
            e: p4,
            text: "THE END (Temporary Ending)",
            delay: 0.05,
        });
        yield delayer.delay(1);
        // Create Inputs
        let investigateButton = parseHTML("<input type='submit' value='Finish the Game' form='controls'>")[0];
        game.view.controls.element.appendChild(investigateButton);
        // Add Event Listeners
        yield new Promise((r) => {
            game.view.controls.addEventListener("submit", (ev) => {
                game.dispatcher.dispatch({
                    event: "finish",
                });
                r(undefined);
            });
        });
    });
};
export default main;
