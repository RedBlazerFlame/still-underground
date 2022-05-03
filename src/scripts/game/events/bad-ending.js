var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { el, txt } from "../../aliases.js";
import { delayer, textDisplayer } from "../../asyncHelpers.js";
import { appendChildren, parseHTML } from "../../domHelpers.js";
const main = function (game) {
    return __awaiter(this, void 0, void 0, function* () {
        // Preprocessing
        game.view.navigator.hidePrev();
        game.view.navigator.hideNext();
        game.store.data.ending = "BAD";
        // Displaying text and other plot elements
        let p1 = el("p");
        game.view.content.element.appendChild(p1);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: "You inputted your answer. ",
            delay: 0.05,
        });
        yield delayer.delay(0.4);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: "Suddenly,",
            delay: 0.05,
        });
        yield delayer.delay(0.2);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: " all the doors locked down and sirens started ringing.",
            delay: 0.05,
        });
        p1.appendChild(el("br"));
        yield delayer.delay(1);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: "You realized that you made a mistake. ",
            delay: 0.05,
        });
        yield delayer.delay(0.4);
        let redSpan1 = parseHTML(`<span class="red"></span>`)[0];
        p1.appendChild(redSpan1);
        yield textDisplayer.displayAsynchronously({
            e: redSpan1,
            text: "Eve",
            delay: 0.05,
        });
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: " now knows that you are down in the basement,",
            delay: 0.05,
        });
        yield delayer.delay(0.2);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: " and you can't do anything to escape anymore. ",
            delay: 0.05,
        });
        yield delayer.delay(0.4);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: "It won't be long until he comes back",
            delay: 0.05,
        });
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: "...",
            delay: 0.2,
        });
        yield delayer.delay(2);
        appendChildren(p1, [el("br"), el("br")]);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: "Sometime later, ",
            delay: 0.05,
        });
        yield delayer.delay(0.2);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: "Eve",
            delay: 0.05,
        });
        yield delayer.delay(0.2);
        yield textDisplayer.displayAsynchronously({
            e: p1,
            text: " and some security guards arrived at the basement.",
            delay: 0.05,
        });
        yield delayer.delay(1);
        /// Eve Dialogues
        let eveDialogueWrapper1 = parseHTML(`<p><b class="red">Eve</b>: &quot;</p>`)[0];
        let eveDialogue1 = el("span");
        appendChildren(eveDialogueWrapper1, [
            eveDialogue1,
            txt('"'),
        ]);
        game.view.content.element.appendChild(eveDialogueWrapper1);
        yield delayer.delay(0.2);
        yield textDisplayer.displayAsynchronously({
            e: eveDialogue1,
            text: "I see we caught a trespasser.",
            delay: 0.05,
        });
        yield delayer.delay(1);
        let eveDialogueWrapper2 = parseHTML(`<p><b class="red">Eve</b>: &quot;</p>`)[0];
        let eveDialogue2 = el("span");
        appendChildren(eveDialogueWrapper2, [
            eveDialogue2,
            txt('"'),
        ]);
        game.view.content.element.appendChild(eveDialogueWrapper2);
        yield delayer.delay(0.2);
        yield textDisplayer.displayAsynchronously({
            e: eveDialogue2,
            text: "You know what I do with those who trespass on MY property, right?",
            delay: 0.05,
        });
        yield delayer.delay(2);
        let eveDialogueWrapper3 = parseHTML(`<p><b class="red">Eve</b>: &quot;</p>`)[0];
        let eveDialogue3 = el("span");
        appendChildren(eveDialogueWrapper3, [
            eveDialogue3,
            txt('"'),
        ]);
        game.view.content.element.appendChild(eveDialogueWrapper3);
        yield delayer.delay(0.2);
        yield textDisplayer.displayAsynchronously({
            e: eveDialogue3,
            text: "I force them to ANIMATE my music videos!!!",
            delay: 0.05,
        });
        yield delayer.delay(1);
        let eveDialogueWrapper4 = parseHTML(`<p><b class="red">Eve</b>: &quot;</p>`)[0];
        let eveDialogue4 = el("span");
        appendChildren(eveDialogueWrapper4, [
            eveDialogue4,
            txt('"'),
        ]);
        game.view.content.element.appendChild(eveDialogueWrapper4);
        yield delayer.delay(0.2);
        yield textDisplayer.displayAsynchronously({
            e: eveDialogue4,
            text: "Now get to work! We need to finish animating my next song...",
            delay: 0.05,
        });
        yield delayer.delay(1);
        /// Post Eve Dialogue
        let p2 = el("p");
        game.view.content.element.appendChild(p2);
        yield textDisplayer.displayAsynchronously({
            e: p2,
            text: "Eve made you sit down in front of one of the computers. ",
            delay: 0.05,
        });
        yield delayer.delay(0.4);
        yield textDisplayer.displayAsynchronously({
            e: p2,
            text: "Soon, ",
            delay: 0.05,
        });
        yield delayer.delay(0.2);
        yield textDisplayer.displayAsynchronously({
            e: p2,
            text: "other animators joined in and worked on animating the next Eve MV.",
            delay: 0.05,
        });
        yield delayer.delay(1);
        let i1 = el("i");
        game.view.content.element.appendChild(i1);
        yield textDisplayer.displayAsynchronously({
            e: i1,
            text: "So there were animators in the basement after all!",
            delay: 0.05,
        });
        yield delayer.delay(1);
        let p3 = el("p");
        game.view.content.element.appendChild(p3);
        yield textDisplayer.displayAsynchronously({
            e: p3,
            text: "You feel that this injustice must be corrected, ",
            delay: 0.05,
        });
        yield delayer.delay(0.2);
        yield textDisplayer.displayAsynchronously({
            e: p3,
            text: "but you feel helpless because you're now trapped in Eve's basement, ",
            delay: 0.05,
        });
        yield delayer.delay(0.2);
        yield textDisplayer.displayAsynchronously({
            e: p3,
            text: "destined to animate for him, ",
            delay: 0.05,
        });
        yield delayer.delay(0.2);
        yield textDisplayer.displayAsynchronously({
            e: p3,
            text: "forever.",
            delay: 0.05,
        });
        yield delayer.delay(1);
        /// TODO Image of you animating for Eve
        /// THE END (Bad Ending)
        let p4 = el("p");
        game.view.content.element.appendChild(p4);
        yield textDisplayer.displayAsynchronously({
            e: p4,
            text: "THE END (Bad Ending)",
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
