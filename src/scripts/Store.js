// The Store object automatically saves the data to localStorage whenever the state changes
export class Store {
    // Constructor
    constructor(targetObj, key) {
        this.key = key;
        this.data = new Proxy(targetObj, {
            set: (o, p, v, r) => {
                let res = Reflect.set(o, p, v, r);
                localStorage.setItem(this.key, JSON.stringify(this.data));
                return res;
            },
        });
    }
    // Methods
    load() {
        // Get the raw data from localStorage, if it exists
        let raw = localStorage.getItem(this.key);
        if (raw === null) {
            // The raw data does not exist; save the existing data onto localStorage
            this.save();
            return;
        }
        // The raw data exists. Set the data of the object to the data in localStorage
        this.set(JSON.parse(raw));
        return;
    }
    set(newObj) {
        // Since the object reference changes, we need to recreate the proxy
        this.data = new Proxy(newObj, {
            set: (o, p, v, r) => {
                let res = Reflect.set(o, p, v, r);
                localStorage.setItem(this.key, JSON.stringify(this.data));
                return res;
            },
        });
        // Save the new data into localStorage
        this.save();
    }
    save() {
        localStorage.setItem(this.key, JSON.stringify(this.data));
    }
}
