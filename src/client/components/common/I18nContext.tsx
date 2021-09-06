import { createContext } from 'react';

export interface I18nContextProps {
    locale?: string;
    translations?: {
        [key: string]: { [context: string]: string };
    };
}

const I18nContext = createContext<I18nContextProps>({});

export default I18nContext;
