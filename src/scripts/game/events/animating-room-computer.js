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
import { getFormData } from "../../formHelpers.js";
const main = function (game) {
    return __awaiter(this, void 0, void 0, function* () {
        // Preprocessing
        game.view.navigator.hideNext();
        // Display the text
        let p1 = el("p");
        game.view.content.element.appendChild(p1);
        if (game.store.data.animatingRoomDoorState === "CLOSED") {
            yield textDisplayer.displayAsynchronously({
                e: p1,
                text: "The computer is displaying a question.",
                delay: 0.05,
            });
            appendChildren(p1, [el("br"), el("br")]);
            yield delayer.delay(1);
            yield textDisplayer.displayAsynchronously({
                e: p1,
                text: '"Which Eve song has the most listens on Spotify?"',
                delay: 0.05,
            });
            yield delayer.delay(1);
        }
        else if (game.store.data.animatorQuartersLock1 === "CLOSED") {
            yield textDisplayer.displayAsynchronously({
                e: p1,
                text: "The computer is displaying a question.",
                delay: 0.05,
            });
            appendChildren(p1, [el("br"), el("br")]);
            yield delayer.delay(1);
            yield textDisplayer.displayAsynchronously({
                e: p1,
                text: "\"In the song titled 'World Domination', Eve sings a solo part around two minutes into the song. What is the name of the Utaite that sings right after Eve?\"",
                delay: 0.05,
            });
            p1.appendChild(el("br"));
            yield delayer.delay(1);
            yield textDisplayer.displayAsynchronously({
                e: p1,
                text: "Make sure to input your answer using English characters. Do not include spaces. Do not capitalize any letters.",
                delay: 0.05,
            });
            yield delayer.delay(1);
        }
        else {
            yield textDisplayer.displayAsynchronously({
                e: p1,
                text: "The computer is displaying a smiley face. Nothing to see here. Move on.",
                delay: 0.05,
            });
            yield delayer.delay(1);
        }
        // Create controls
        yield new Promise((r) => {
            // Back Button
            game.view.navigator.previousAddEventListener("click", (ev) => {
                game.dispatcher.dispatch({
                    event: "animating-room-1",
                });
                r(undefined);
            });
            // Other Buttons
            if (game.store.data.animatingRoomDoorState === "CLOSED") {
                /*
                - Select Elements — Question
                    - Answer Choices
                        - Options
                            - Dramaturgy
                            - Anoko Secret
                            - Kaikai Kitan
                            - Okinimesumama
                - Inputs — Question
                    - Submit
                        - Onsubmit
                            - IF answer === “Kaikai Kitan”
                                
                                [open-animating-room-door-1](https://www.notion.so/open-animating-room-door-1-8c44dba6450741f1ae8154e55e32ff82)
                                
                            - ELSE
                                
                                [bad-ending](https://www.notion.so/bad-ending-710db42c1fe943c8be72a0d3ce83114c)
                */
                let answerChoices = parseHTML(`<select class='margin-12px' form='controls' name="choices" id="choices">
                    <option value="Dramaturgy">Dramaturgy</option>
                    <option value="Anoko Secret">Anoko Secret</option>
                    <option value="Kaikai Kitan">Kaikai Kitan</option>
                    <option value="Okinimesumama">Okinimesumama</option>
                </select>`)[0];
                game.view.controls.element.appendChild(answerChoices);
                let submitButton = parseHTML(`<input type='submit' value='Submit "Dramaturgy"' form='controls'>`)[0];
                game.view.controls.element.appendChild(submitButton);
                // Event Listeners
                game.view.controls.addEventListener("submit", (ev) => {
                    let { choices: answer } = getFormData(game.view.controls.element);
                    // Check if input is correct
                    if (answer === "Kaikai Kitan") {
                        game.dispatcher.dispatch({
                            event: "open-animating-room-door-1",
                        });
                    }
                    else {
                        game.dispatcher.dispatch({
                            event: "bad-ending",
                        });
                    }
                    r(undefined);
                });
                answerChoices.addEventListener("change", (ev) => {
                    // If the input changes, set the value of the submit button
                    submitButton.value = `Submit "${answerChoices.value}"`;
                });
            }
            else if (game.store.data.animatorQuartersLock1 === "CLOSED") {
                /*
                - Inputs — Question
                    - Answer
                        - type: text
                        - placeholder: Input the Name
                - Inputs —  Question
                    - Submit
                        - Onsubmit
                            - IF answer.toLowerCase().trim() === sou →
                                
                                [open-animator-quarters-lock-1](https://www.notion.so/open-animator-quarters-lock-1-9304c9f834de4d2b8098ef50d3314a53)
                                
                            - ELSE [bad-ending]
                */
                let answerInput = parseHTML(`<input class='margin-12px textarea' type='text' placeholder="Input the Name" form='controls' name="answer" id="answer">`)[0];
                game.view.controls.element.appendChild(answerInput);
                let submitButton = parseHTML(`<input type='submit' value='Submit ""' form='controls'>`)[0];
                game.view.controls.element.appendChild(submitButton);
                // Event Listeners
                game.view.controls.addEventListener("submit", (ev) => {
                    let { answer } = getFormData(game.view.controls.element);
                    // Check if input is correct
                    if (answer.toLowerCase().trim() === "sou") {
                        game.dispatcher.dispatch({
                            event: "open-animator-quarters-lock-1",
                        });
                    }
                    else {
                        game.dispatcher.dispatch({
                            event: "bad-ending",
                        });
                    }
                    r(undefined);
                });
                answerInput.addEventListener("input", (ev) => {
                    // If the input changes, set the value of the submit button
                    submitButton.value = `Submit "${answerInput.value
                        .toLowerCase()
                        .trim()}"`;
                });
            }
        });
    });
};
export default main;
