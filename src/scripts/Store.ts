export class Store<T extends Object> {
    // Properties
    data: T;
    key: string;

    // Methods
    public load() {
        let raw = localStorage.getItem(this.key);

        if (raw === null) {
            this.save();
            return;
        }

        this.set(JSON.parse(raw));

        return;
    }

    public set(newObj: T) {
        this.data = new Proxy(newObj, {
            set: (o, p, v, r) => {
                let res = Reflect.set(o, p, v, r);
                localStorage.setItem(this.key, JSON.stringify(this.data));
                return res;
            },
        });

        this.save();
    }

    public save() {
        localStorage.setItem(this.key, JSON.stringify(this.data));
    }

    // Constructor
    constructor(targetObj: T, key: string) {
        this.key = key;
        this.data = new Proxy(targetObj, {
            set: (o, p, v, r) => {
                let res = Reflect.set(o, p, v, r);
                localStorage.setItem(this.key, JSON.stringify(this.data));
                return res;
            },
        });
    }
}
