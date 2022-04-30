// Imports
import { Store } from "./Store.js";

// Store testing
let myStore = new Store<{ value: number; isSus: boolean }>(
    { value: 0, isSus: false },
    "testStore"
);

myStore.load();

myStore.data.value += 1;

if (myStore.data.value > 5) {
    myStore.set({
        value: 0,
        isSus: !myStore.data.isSus,
    });
}

console.log(myStore.data);
