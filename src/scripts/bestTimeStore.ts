import { Store } from "./Store.js";

// This store tracks the Fauna Document ID of the best time

export type BestTimeStore = {
    bestNeutralId?: string;
    bestGoodId?: string;
};

const bestTimeStore = new Store<BestTimeStore>({
    targetObj: {},
    key: "bestTime",
});

export default bestTimeStore;
