export const delay = (s: number) =>
    new Promise((res) =>
        setTimeout(() => {
            res(undefined);
        }, s * 1000)
    );
