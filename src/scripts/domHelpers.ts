export function parseHTML(s: string): HTMLElement[] {
    return [
        ...new DOMParser().parseFromString(s, "text/html").body.childNodes,
    ] as HTMLElement[];
}

export function appendChildren(e: HTMLElement, c: HTMLElement[]): HTMLElement {
    for (let child of c) {
        e.appendChild(child);
    }
    return e;
}
