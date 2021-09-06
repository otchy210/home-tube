import { useEffect } from 'react';
import { useState } from 'react';
import I18nContext, { I18nContextProps } from './common/I18nContext';
import Base from './layout/Base';

const Main: React.FC<{}> = () => {
    const [loading, setLoading] = useState(true);
    const [i18nContext, setI18nContext] = useState<I18nContextProps>({});
    useEffect(() => {
        const locale = 'ja';
        (async () => {
            const result = await fetch(`/i18n/${locale}.json`);
            const translations = await result.json();
            setLoading(false);
            setI18nContext({ locale, translations });
        })();
    }, []);
    return (
        <>
            {!loading && (
                <I18nContext.Provider value={i18nContext}>
                    <Base />
                </I18nContext.Provider>
            )}
        </>
    );
};

export default Main;
