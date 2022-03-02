const PREFIX = 'HT-';

const getString = <T extends string>(key: string, defaultValue: T): T => {
    return (localStorage.getItem(`${PREFIX}${key}`) as T) ?? defaultValue;
};

const setString = <T extends string>(key: string, value: T): void => {
    localStorage.setItem(`${PREFIX}${key}`, value);
};

export default {
    getString,
    setString,
};
