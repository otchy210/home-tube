export const setIfExist = (name: string, searchParams: URLSearchParams, setter: (value: string) => void) => {
    const value = searchParams.get(name);
    if (!value) {
        return;
    }
    setter(value);
};
