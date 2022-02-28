import React, { ReactNode, useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import ls from '../../utils/LocalStorage';
import i18next, { TFunction } from 'i18next';

type LanguageKey = 'en' | 'ja';

type Language = {
    key: LanguageKey;
    label: string;
};

export const LANGUAGES: Language[] = [
    { key: 'en', label: 'English' },
    { key: 'ja', label: 'Japanese' },
];

type I18nContextValue = {
    langKey: LanguageKey;
    setLangKey: (langKey: LanguageKey) => void;
    t: TFunction;
};

const LANG_KEY = 'LANG_KEY';

const getLangKey = (): LanguageKey => {
    const storedKey = ls.getString(LANG_KEY, '');
    if (storedKey.length > 0) {
        return storedKey as LanguageKey;
    }
    const keys = LANGUAGES.map((lang) => lang.key);
    const foundKey = navigator.languages.find((key) => {
        return keys.includes(key as LanguageKey);
    });
    if (foundKey) {
        ls.setString(LANG_KEY, foundKey);
        return foundKey as LanguageKey;
    }
    return LANGUAGES[0].key;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const I18nContext = createContext<I18nContextValue>({ langKey: getLangKey(), setLangKey: () => {}, t: i18next.t });

export const useI18n = (): I18nContextValue => {
    return useContext(I18nContext);
};

type Props = {
    children: ReactNode;
};

const I18nProvider: React.FC<Props> = ({ children }) => {
    const [langKey, setStateLangKey] = useState<LanguageKey>(getLangKey());
    const setLangKey = (langKey: LanguageKey) => {
        setStateLangKey(langKey);
        ls.setString(LANG_KEY, langKey);
        location.reload();
    };
    i18next.t;
    useEffect(() => {
        i18next.init({
            lng: langKey,
            resources: {
                en: {
                    translation: {
                        test: 'TEST',
                    },
                },
                ja: {
                    translation: {
                        test: 'テスト',
                    },
                },
            },
        });
    }, [langKey]);
    return <I18nContext.Provider value={{ langKey, setLangKey, t: i18next.t }}>{children}</I18nContext.Provider>;
};

export default I18nProvider;
