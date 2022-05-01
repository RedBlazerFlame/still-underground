var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { delay, delayer, textDisplayer } from "../../asyncHelpers.js";
import { appendChildren } from "../../domHelpers.js";
// The code here is just a test to get myself comfortable with the set-up
const main = function (game) {
    return __awaiter(this, void 0, void 0, function* () {
        // Paragraph 1
        let par1 = document.createElement("p");
        game.view.content.element.appendChild(par1);
        yield textDisplayer.displayAsynchronously({
            e: par1,
            text: "Hi Mom!",
            delay: 0.05,
        });
        yield delayer.delay(1);
        // Paragraph 2
        let par2 = document.createElement("p");
        game.view.content.element.appendChild(par2);
        yield textDisplayer.displayAsynchronously({
            e: par2,
            text: "This occurred one second afterwards!",
            delay: 0.05,
        });
        yield delayer.delay(2);
        // Cat Image
        let catImage = document.createElement("img");
        catImage.src =
            "https://4.bp.blogspot.com/-_vTDmo_fSTw/T3YTV0AfGiI/AAAAAAAAAX4/Zjh2HaoU5Zo/s1600/beautiful%2Bkitten.jpg";
        catImage.style.width = "20vw";
        game.view.content.element.appendChild(catImage);
        yield delayer.delay(1);
        // Question
        let question = document.createElement("p");
        game.view.content.element.appendChild(question);
        yield textDisplayer.displayAsynchronously({
            e: question,
            text: "Will you pet the cat?",
            delay: 0.05,
        });
        yield delayer.delay(1);
        let yesButton = document.createElement("button");
        let noButton = document.createElement("button");
        yesButton.textContent = "YES OF COURSE!";
        noButton.textContent = "No.";
        yesButton.classList.add("margin-12px");
        noButton.classList.add("margin-12px");
        appendChildren(game.view.controls.element, [yesButton, noButton]);
        let par3 = document.createElement("p");
        game.view.content.element.appendChild(par3);
        const catStatus = yield new Promise((res) => {
            yesButton.addEventListener("click", (ev) => __awaiter(this, void 0, void 0, function* () {
                yield textDisplayer.displayAsynchronously({
                    e: par3,
                    text: "M E O W",
                    delay: 0.25,
                });
                res({
                    catStatus: "petted",
                });
            }));
            noButton.addEventListener("click", (ev) => __awaiter(this, void 0, void 0, function* () {
                yield textDisplayer.displayAsynchronously({
                    e: par3,
                    text: "You made the cat cry...",
                    delay: 0.05,
                });
                res({
                    catStatus: "not petted",
                });
            }));
        });
        yield delay(1);
        if (catStatus.catStatus == "petted") {
            let par4 = document.createElement("p");
            par4.textContent =
                "You're a good human so I won't put you in a time loop :D";
            game.view.content.element.appendChild(par4);
            return;
        }
        // Now do the event again!
        let par4 = document.createElement("p");
        par4.textContent = "HAHA NOW YOU ARE STUCK IN A TIME LOOP";
        game.view.content.element.appendChild(par4);
        yield delay(2);
        par4.textContent = "";
        yield textDisplayer.displayAsynchronously({
            e: par4,
            text: "Time Loop In.",
            delay: 0.05,
        });
        yield textDisplayer.displayAsynchronously({
            e: par4,
            text: ".. ",
            delay: 0.25,
        });
        let par5 = document.createElement("p");
        game.view.content.element.appendChild(par5);
        par5.textContent = "3";
        yield delay(1);
        par5.textContent = "2";
        yield delay(1);
        par5.textContent = "1";
        yield delay(1);
        game.dispatcher.dispatch({
            event: "start-1",
        });
    });
};
export default main;
