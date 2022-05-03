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
        // TODO Storing Best Times
        // Clearing LocalStorage
        game.store.delete();
        // Concluding Text
        let p1 = el("p");
        game.view.content.element.appendChild(p1);
        p1.appendChild(parseHTML(`<section class="width-60vw h1">
    <img class="width-60vw" src="/images/logo.png" alt="Still Underground" />
</section>`)[0]);
        p1.appendChild(el("br"));
        yield delayer.delay(2);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: "Made by RedBlazerFlame.",
            delay: 0.05,
        });
        appendChildren(p1, [el("br"), el("br")]);
        yield delayer.delay(2);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: "Thanks for Playing!",
            delay: 0.05,
        });
        yield delayer.delay(4);
        game.view.content.element.innerHTML = "";
        // Redirect to Leaderboard
        window.location.replace("/leaderboard");
        // The game ends here. Nothing to see anymore :>
    });
};
export default main;
