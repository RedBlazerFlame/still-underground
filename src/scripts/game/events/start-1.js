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
            text: `You are a cop who has been tasked to investigate the recent missing people
cases in your town. Rumors say that, in the mountains, there is a basement
where a local artist named `,
            delay: 0.05,
        });
        let b1 = el("b");
        p1.appendChild(b1);
        yield textDisplayer.displayAsynchronously({
            e: b1,
            text: `Eve`,
            delay: 0.05,
        });
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: ` keeps his animators trapped and forces them to make music videos for him.`,
            delay: 0.05,
        });
        yield delayer.delay(0.5);
        // Show Next Button
        game.view.navigator.showNext();
        yield new Promise((r) => {
            game.view.navigator.nextAddEventListener("click", (ev) => {
                game.dispatcher.dispatch({
                    event: "start-2",
                });
                r(undefined);
            });
        });
    });
};
export default main;
