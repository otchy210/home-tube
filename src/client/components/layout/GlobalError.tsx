import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import i18nText from '../common/i18nText';
import { useSettings } from '../common/useSettings';

const useStyles = makeStyles((theme) => ({
    alert: {
        marginBottom: theme.spacing(2),
    },
}));

const getSettingsError = (settings: Settings) => {
    if (Object.keys(settings).length === 0) {
        return i18nText('Found no settings. Go to settings page to see the instruction.');
    }
    return '';
};

const GlobalError: React.FC<{}> = () => {
    const classes = useStyles();
    const settings = useSettings();
    const settingsError = getSettingsError(settings);
    const history = useHistory();
    return (
        <>
            {settingsError && (
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
                    {settingsError}
                </Alert>
            )}
        </>
    );
};

export default GlobalError;
