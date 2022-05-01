// The Store object automatically saves the data to localStorage whenever the state changes

export class Store<T extends Object> {
    // Properties
    data: T;
    key: string;

    // Methods
    public load() {
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

    public set(newObj: T) {
        // Since the object reference changes, we need to recreate the proxy
        this.data = new Proxy(newObj, {
            set: (o, p, v, r) => {
                let res = Reflect.set(o, p, v, r);
                localStorage.setItem(this.key, JSON.stringify(this.data));
                return res;
            },
        });

        // We also need to ensure that all objects contained within the main object is wrapped in a proxy
        // If we don't do this, doing things like obj.a.b = "Another Value" won't reflect as a set operation
        this.proxify();

        // Save the new data into localStorage
        this.save();
    }

    public save() {
        localStorage.setItem(this.key, JSON.stringify(this.data));
    }

    public proxify() {
        // This function will be implemented in subclasses
    }

    // Constructor
    constructor({ targetObj, key }: { targetObj: T; key: string }) {
        this.key = key;
        let localStorageData = localStorage.getItem(key);
        if (localStorageData !== null) {
            targetObj = JSON.parse(localStorageData);
        } else {
            localStorage.setItem(key, JSON.stringify(targetObj));
        }
        this.data = new Proxy(targetObj, {
            set: (o, p, v, r) => {
                let res = Reflect.set(o, p, v, r);
                localStorage.setItem(this.key, JSON.stringify(this.data));
                return res;
            },
        });
        this.proxify();
    }
}
