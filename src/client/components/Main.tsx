import { CircularProgress } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import { Api } from './common/Api';
import ApiContext from './common/ApiContext';
import { fetchJson } from './common/fetchJson';
import { setI18n } from './common/i18nText';
import SettingsContext from './common/SettingsContext';
import Base from './layout/Base';

const Main: React.FC<{}> = () => {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState<Settings>({});
    const [api, setApi] = useState<Api>(new Api());
    useEffect(() => {
        const locale = 'ja';
        (async () => {
            const settings = await fetchJson<Settings>('/settings.json');
            setSettings(settings);
            const api = new Api(settings.apiPort);
            setApi(api);
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
                    <ApiContext.Provider value={api}>
                        <Base />
                    </ApiContext.Provider>
                </SettingsContext.Provider>
            )}
        </>
    );
};

export default Main;
