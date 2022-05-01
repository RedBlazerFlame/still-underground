export function el(type: keyof HTMLElementTagNameMap): HTMLElement {
    return document.createElement(type);
}

export function txt(txt: string): Text {
    return document.createTextNode(txt);
}
