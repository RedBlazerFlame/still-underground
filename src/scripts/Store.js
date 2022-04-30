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
        let raw = localStorage.getItem(this.key);
        if (raw === null) {
            this.save();
            return;
        }
        this.set(JSON.parse(raw));
        return;
    }
    set(newObj) {
        this.data = new Proxy(newObj, {
            set: (o, p, v, r) => {
                let res = Reflect.set(o, p, v, r);
                localStorage.setItem(this.key, JSON.stringify(this.data));
                return res;
            },
        });
        this.save();
    }
    save() {
        localStorage.setItem(this.key, JSON.stringify(this.data));
    }
}
