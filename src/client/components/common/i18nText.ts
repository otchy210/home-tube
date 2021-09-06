import { useContext } from 'react';
import I18nContext from './I18nContext';

interface Props {
    context?: string;
}

const i18nText = (key: string, props?: Props): string => {
    const { context } = props ?? {};
    const i18nContext = useContext(I18nContext);
    const translations = i18nContext?.translations;
    const values = translations?.[key];
    const text = values?.[context ?? ''] ?? key;
    return text;
};

export default i18nText;
