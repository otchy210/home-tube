import { createContext } from 'react';

export type Translations = {
    [key: string]: { [context: string]: string };
};

export interface I18nContextProps {
    locale?: string;
    translations?: Translations;
}

const I18nContext = createContext<I18nContextProps>({});

export default I18nContext;
