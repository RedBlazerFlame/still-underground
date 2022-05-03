// This function will extract form data as an Object

export const getFormData = <T extends Object>(e: HTMLFormElement): T => {
    return Object.fromEntries(new FormData(e).entries()) as unknown as T;
};
