import { Store } from "./Store.js";
const bestTimeStore = new Store({}, "bestTime");
bestTimeStore.load();
export default bestTimeStore;
