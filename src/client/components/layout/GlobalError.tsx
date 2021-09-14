import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Api } from '../common/Api';
import i18nText from '../common/i18nText';
import { useApi } from '../common/useApi';
import { useSettings } from '../common/useSettings';

const useStyles = makeStyles((theme) => ({
    alert: {
        marginBottom: theme.spacing(2),
    },
}));

const getGlobalError = async (settings: Settings, api: Api) => {
    if (Object.keys(settings).length === 0) {
        return i18nText('Found no settings. Go to settings page to see the instruction.');
    }
    const apiResult = await api.ping();
    if (!apiResult.ok) {
        return i18nText("Api server doesn't work properly. Go to settings page to see the instruction.");
    }
    return '';
};

const GlobalError: React.FC<{}> = () => {
    const classes = useStyles();
    const settings = useSettings();
    const api = useApi();
    const history = useHistory();
    const [globalError, setGlobalError] = useState('');
    useEffect(() => {
        (async () => {
            const globalError = await getGlobalError(settings, api);
            setGlobalError(globalError);
        })();
    }, []);
    return (
        <>
            {globalError && (
                <Alert
                    variant="filled"
                    severity="error"
                    className={classes.alert}
                    action={
                        <Button
                            color="inherit"
                            size="small"
                            onClick={() => {
                                history.push('/settings');
                            }}
                        >
                            {i18nText('Open settings')}
                        </Button>
                    }
                >
                    {globalError}
                </Alert>
            )}
        </>
    );
};

export default GlobalError;
