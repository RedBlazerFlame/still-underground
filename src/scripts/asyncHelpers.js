var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PROGRAM_MODE, SPEEDUP_FACTOR } from "./mode.js";
// This function will delay execution of an asynchronous function by a specified number of seconds
export const delay = (s) => new Promise((res) => {
    if (PROGRAM_MODE === "PROD") {
        setTimeout(() => {
            res(undefined);
        }, s * 1000);
    }
    else {
        setTimeout(() => {
            res(undefined);
        }, (s * 1000) / SPEEDUP_FACTOR);
    }
});
export class AsyncDelayer {
    // Constructor
    constructor() {
        this.__displayInstantaneously = false;
    }
    // Methods
    instant(b) {
        this.__displayInstantaneously = b;
    }
    // This will display text and elements asynchronously
    // It allows text to gradually appear on the screen
    delay(s) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.__displayInstantaneously ? 0 : yield delay(s);
        });
    }
}
export const delayer = new AsyncDelayer();
// This will allow us to display text gradually
export function displayAsynchronously({ e, text, delay: s, useDomAPI = false, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (s == 0) {
            useDomAPI
                ? e.appendChild(document.createTextNode(text))
                : (e.innerHTML += text);
        }
        else {
            for (let letter of text) {
                useDomAPI
                    ? e.appendChild(document.createTextNode(letter))
                    : (e.innerHTML += letter);
                yield delay(s);
            }
        }
    });
}
export class AsyncTextDisplayer {
    // Constructor
    constructor() {
        this.__displayInstantaneously = false;
    }
    // Methods
    instant(b) {
        this.__displayInstantaneously = b;
    }
    // This will display text and elements asynchronously
    // It allows text to gradually appear on the screen
    displayAsynchronously({ e, text, delay: s, useDomAPI = false, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield displayAsynchronously({
                e,
                text,
                delay: this.__displayInstantaneously ? 0 : s,
                useDomAPI,
            });
        });
    }
}
export const textDisplayer = new AsyncTextDisplayer();
