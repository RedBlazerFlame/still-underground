export const delay = (s) => new Promise((res) => setTimeout(() => {
    res(undefined);
}, s * 1000));
