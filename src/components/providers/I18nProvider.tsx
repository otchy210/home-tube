import React, { ReactNode, useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import ls from '../../utils/LocalStorage';
import i18next, { TFunction } from 'i18next';
import HttpApi from 'i18next-http-backend';

export type LanguageKey = 'en' | 'ja';

type Language = {
    key: LanguageKey;
    label: string;
};

export const LANGUAGES: Language[] = [
    { key: 'en', label: 'English' },
    { key: 'ja', label: 'Japanese' },
];
/*
 t('English') t('Japanese')
 */

type I18nContextValue = {
    langKey: LanguageKey;
    setLangKey: (langKey: LanguageKey) => void;
    translationReady: boolean;
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
const I18nContext = createContext<I18nContextValue>({ langKey: getLangKey(), setLangKey: () => {}, translationReady: false, t: i18next.t });

export const useI18n = (): I18nContextValue => {
    return useContext(I18nContext);
};

type Props = {
    children: ReactNode;
};

const I18nProvider: React.FC<Props> = ({ children }) => {
    const [langKey, setStateLangKey] = useState<LanguageKey>(getLangKey());
    const [translationReady, setTranslationReady] = useState<boolean>(false);
    const setLangKey = (langKey: LanguageKey) => {
        i18next.changeLanguage(langKey).then(() => {
            setStateLangKey(langKey);
            ls.setString(LANG_KEY, langKey);
        });
    };
    useEffect(() => {
        i18next
            .use(HttpApi)
            .init({
                lng: langKey,
                fallbackLng: ['en'],
                backend: {
                    loadPath: '/locales/{{lng}}.json',
                },
                returnEmptyString: false,
            })
            .then(() => {
                setTranslationReady(true);
            });
    }, []);
    return <I18nContext.Provider value={{ langKey, setLangKey, translationReady, t: i18next.t }}>{children}</I18nContext.Provider>;
};

export default I18nProvider;
