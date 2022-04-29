export function isTimeRecord(obj) {
    return (typeof (obj === null || obj === void 0 ? void 0 : obj.username) === "string" &&
        typeof (obj === null || obj === void 0 ? void 0 : obj.time) === "number" &&
        Object.keys(obj).length === 2);
}
