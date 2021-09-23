import { useContext } from 'react';

export const setI18n = (i18n: I18n) => {
    window.i18n = i18n;
}

interface Props {
    context?: string;
}

const i18nText = (key: string, props?: Props): string => {
    if (!window.i18n) {
        return key;
    }
    const { context } = props ?? {};
    const translations = window.i18n?.translations;
    const values = translations?.[key];
    const text = values?.[context ?? ''] ?? key;
    return text;
};

export default i18nText;
