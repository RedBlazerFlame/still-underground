// This function will delay execution of an asynchronous function by a specified number of seconds
export const delay = (s: number) =>
    new Promise((res) =>
        setTimeout(() => {
            res(undefined);
        }, s * 1000)
    );

export class AsyncDelayer {
    // Properties
    private __displayInstantaneously: boolean;

    // Methods
    public instant(b: boolean) {
        this.__displayInstantaneously = b;
    }

    // This will display text and elements asynchronously
    // It allows text to gradually appear on the screen
    public async delay(s: number): Promise<unknown> {
        return this.__displayInstantaneously ? 0 : await delay(s);
    }

    // Constructor
    constructor() {
        this.__displayInstantaneously = false;
    }
}

export const delayer = new AsyncDelayer();

// This will allow us to display text gradually

export async function displayAsynchronously({
    e,
    text,
    delay: s,
    useDomAPI = false,
}: {
    e: HTMLElement;
    text: string;
    delay: number;
    useDomAPI?: boolean;
}) {
    if (s == 0) {
        useDomAPI
            ? e.appendChild(document.createTextNode(text))
            : (e.innerHTML += text);
    } else {
        for (let letter of text) {
            useDomAPI
                ? e.appendChild(document.createTextNode(letter))
                : (e.innerHTML += letter);
            await delay(s);
        }
    }
}
export class AsyncTextDisplayer {
    // Properties
    private __displayInstantaneously: boolean;

    // Methods
    public instant(b: boolean) {
        this.__displayInstantaneously = b;
    }

    // This will display text and elements asynchronously
    // It allows text to gradually appear on the screen
    public async displayAsynchronously({
        e,
        text,
        delay: s,
        useDomAPI = false,
    }: {
        e: HTMLElement;
        text: string;
        delay: number;
        useDomAPI?: boolean;
    }): Promise<unknown> {
        return await displayAsynchronously({
            e,
            text,
            delay: this.__displayInstantaneously ? 0 : s,
            useDomAPI,
        });
    }

    // Constructor
    constructor() {
        this.__displayInstantaneously = false;
    }
}

export const textDisplayer = new AsyncTextDisplayer();
