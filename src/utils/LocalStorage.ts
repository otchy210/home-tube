const getString = <T extends string>(key: string, defaultValue: T): T => {
    return (localStorage.getItem(key) as T) ?? defaultValue;
};

const setString = (key: string, value: string): void => {
    localStorage.setItem(key, value);
};

export default {
    getString,
    setString,
};
