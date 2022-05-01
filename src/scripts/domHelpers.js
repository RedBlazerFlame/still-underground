export function parseHTML(s) {
    return [
        ...new DOMParser().parseFromString(s, "text/html").body.childNodes,
    ];
}
export function appendChildren(e, c) {
    for (let child of c) {
        e.appendChild(child);
    }
    return e;
}
