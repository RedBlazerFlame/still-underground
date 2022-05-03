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
import bestTimeStore from "../../bestTimeStore.js";
import { appendChildren, parseHTML } from "../../domHelpers.js";
const main = function (game) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        // Preprocessing
        game.view.navigator.hide();
        // Storing Best Times
        if (game.store.data.ending === "GOOD") {
            let currentBestGoodId = bestTimeStore.data.bestGoodId;
            let runTime = parseFloat(((Date.now() - game.store.data.timeStart) / 1000).toFixed(2));
            function createNewEntry() {
                var _a, _b;
                return __awaiter(this, void 0, void 0, function* () {
                    const createNewEntryPromise = fetch("/api/good-ending-times", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: game.store.data.username,
                            time: runTime,
                        }),
                    });
                    let newEntry = yield createNewEntryPromise.then((res) => res.json());
                    let newId = (_b = (_a = newEntry === null || newEntry === void 0 ? void 0 : newEntry.ref) === null || _a === void 0 ? void 0 : _a["@ref"]) === null || _b === void 0 ? void 0 : _b.id;
                    if (newId !== undefined) {
                        bestTimeStore.data.bestGoodId = newId;
                    }
                });
            }
            if (currentBestGoodId === undefined) {
                yield createNewEntry();
            }
            else {
                const getCurrentBestEntry = yield fetch(`/api/good-ending-times/${currentBestGoodId}`).then((res) => res.json());
                const bestTime = (_a = getCurrentBestEntry === null || getCurrentBestEntry === void 0 ? void 0 : getCurrentBestEntry.data) === null || _a === void 0 ? void 0 : _a.time;
                if (bestTime !== undefined) {
                    if (runTime < bestTime) {
                        yield createNewEntry();
                    }
                }
                else {
                    yield createNewEntry();
                }
            }
        }
        else if (game.store.data.ending === "NEUTRAL") {
            let currentBestNeutralId = bestTimeStore.data.bestNeutralId;
            let runTime = parseFloat(((Date.now() - game.store.data.timeStart) / 1000).toFixed(2));
            function createNewEntry() {
                var _a, _b;
                return __awaiter(this, void 0, void 0, function* () {
                    const createNewEntryPromise = fetch("/api/neutral-ending-times", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: game.store.data.username,
                            time: runTime,
                        }),
                    });
                    let newEntry = yield createNewEntryPromise.then((res) => res.json());
                    let newId = (_b = (_a = newEntry === null || newEntry === void 0 ? void 0 : newEntry.ref) === null || _a === void 0 ? void 0 : _a["@ref"]) === null || _b === void 0 ? void 0 : _b.id;
                    if (newId !== undefined) {
                        bestTimeStore.data.bestNeutralId = newId;
                    }
                });
            }
            if (currentBestNeutralId === undefined) {
                yield createNewEntry();
            }
            else {
                const getCurrentBestEntry = yield fetch(`/api/neutral-ending-times/${currentBestNeutralId}`).then((res) => res.json());
                const bestTime = (_b = getCurrentBestEntry === null || getCurrentBestEntry === void 0 ? void 0 : getCurrentBestEntry.data) === null || _b === void 0 ? void 0 : _b.time;
                if (bestTime !== undefined) {
                    if (runTime < bestTime) {
                        yield createNewEntry();
                    }
                }
                else {
                    yield createNewEntry();
                }
            }
        }
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
    });
};
export default main;
