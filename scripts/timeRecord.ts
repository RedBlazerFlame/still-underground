export type TimeRecord = {
    username: string;
    time: number;
};

export function isTimeRecord(obj: { [key: string]: any }): obj is TimeRecord {
    return (
        typeof obj?.username === "string" &&
        typeof obj?.time === "number" &&
        Object.keys(obj).length === 2
    );
}
