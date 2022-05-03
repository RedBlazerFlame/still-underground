// This function will extract form data as an Object
export const getFormData = (e) => {
    return Object.fromEntries(new FormData(e).entries());
};
