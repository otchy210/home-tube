import { CircularProgress } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchJson } from './common/fetchJson';
import I18nContext, { I18nContextProps, Translations } from './common/I18nContext';
import SettingsContext, { SettingsContextProps } from './common/SettingsContext';
import Base from './layout/Base';

const Main: React.FC<{}> = () => {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState<SettingsContextProps>({});
    const [i18n, setI18n] = useState<I18nContextProps>({});
    useEffect(() => {
        const locale = 'ja';
        (async () => {
            const settings = await fetchJson<SettingsContextProps>('/settings.json');
            setSettings(settings);
            const translations = await fetchJson<Translations>(`/i18n/${locale}.json`);
            setI18n({ locale, translations });
            setLoading(false);
        })();
    }, []);
    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : (
                <SettingsContext.Provider value={settings}>
                    <I18nContext.Provider value={i18n}>
                        <Base />
                    </I18nContext.Provider>
                </SettingsContext.Provider>
            )}
        </>
    );
};

export default Main;
