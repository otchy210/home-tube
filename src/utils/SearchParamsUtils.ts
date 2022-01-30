import { Json } from '@otchy/home-tube-api/dist/types';

export const setIfExist = (name: string, searchParams: URLSearchParams, setter: (value: string) => void) => {
    const value = searchParams.get(name);
    if (!value) {
        return;
    }
    setter(value);
};

const isStringArray = (json: Json): json is string[] => {
    if (!Array.isArray(json)) {
        return false;
    }
    for (const value of json) {
        if (typeof value !== 'string') {
            return false;
        }
    }
    return true;
};

export const setIfArrayExist = (name: string, searchParams: URLSearchParams, setter: (value: string[]) => void) => {
    const value = searchParams.get(name);
    if (!value) {
        return;
    }
    const json = JSON.parse(value) as Json;
    if (!isStringArray(json)) {
        return;
    }
    setter(json);
};
