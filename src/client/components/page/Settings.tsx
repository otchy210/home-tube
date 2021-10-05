import { Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import i18nText from '../../common/i18nText';
import { useState } from 'react';
import { useSettings } from '../../common/useSettings';
import TargetFolder from './settings/TargetFolder';
import RegularButton from '../common/RegularButton';
import SaveIcon from '@material-ui/icons/Save';
import NumberInput from '../common/NumberInput';
import { useApi } from '../../common/useApi';
import Warning from '../common/Warning';
import Error from '../common/Error';

const Settings: React.FC<{}> = () => {
    const settings = useSettings() ?? {};
    const api = useApi();
    const [apiPort, setApiPort] = useState<number>(settings.apiPort ?? 0);
    const [apiPortError, setApiPortError] = useState<string>('');
    const [targetFolders, setTargetFolders] = useState<string[]>(settings.targetFolders ?? []);
    const [folderAddError, setFolderAddError] = useState<string>('');
    const [isModified, setIsModified] = useState<boolean>(false);
    const [saveError, setSaveError] = useState<string>('');
    const addFolder = (path: string) => {
        if (!path || path.trim().length === 0) {
            setFolderAddError(i18nText('No folder path set.'));
            return;
        }
        if (targetFolders.includes(path)) {
            setFolderAddError(i18nText('Duplicate folder path set.'));
            return;
        }
        const updatedTargetFolders = [...targetFolders];
        updatedTargetFolders.push(path);
        setTargetFolders(updatedTargetFolders);
        setFolderAddError('');
        setIsModified(true);
    };
    const removeFolder = (path: string) => {
        if (!path || path.trim().length === 0) {
            setFolderAddError(i18nText('No folder path set.'));
            return;
        }
        const index = targetFolders.indexOf(path);
        if (index < 0) {
            return;
        }
        const updatedTargetFolders = [...targetFolders];
        updatedTargetFolders.splice(index, 1);
        setTargetFolders(updatedTargetFolders);
        setIsModified(true);
    };
    const saveSettings = async () => {
        if (apiPort < 1023 || 65535 < apiPort) {
            setApiPortError(i18nText('HTTP port must be between 1024 and 65535.'));
            return;
        }
        setApiPortError('');
        setSaveError('');
        const updatedSettings = {
            apiPort,
            targetFolders,
        } as Settings;
        const result = await api.postSettings(updatedSettings);
        if (!result.ok) {
            setSaveError(i18nText('Failed to save.'));
        }
    };
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4">{i18nText('Settings')}</Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">{i18nText('API server port')}</Typography>
                </Grid>
                <Grid item xs={12} sm={5} md={3} lg={2} xl={1}>
                    <NumberInput
                        value={apiPort}
                        onChange={(e) => {
                            const value = e.target.value;
                            setApiPort(value.length > 0 ? parseInt(value) : 0);
                            setIsModified(true);
                        }}
                        errorText={apiPortError}
                    />
                </Grid>
                <Grid item xs={12} sm={7} md={9} lg={10} xl={11}>
                    <Warning>{i18nText('DO NOT CHANGE unless you know what it is.')}</Warning>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">{i18nText('Target folders')}</Typography>
                </Grid>
                {targetFolders.map((path) => (
                    <TargetFolder path={path} key={path} removeFolder={removeFolder} />
                ))}
                <TargetFolder path="" isNew={true} addFolder={addFolder} errorText={folderAddError} />
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={5} md={3} lg={2} xl={1}>
                    <RegularButton
                        color="primary"
                        startIcon={<SaveIcon />}
                        disabled={!isModified}
                        onClick={saveSettings}
                    >
                        {i18nText('Save settings')}
                    </RegularButton>
                </Grid>
                <Grid item xs={12} sm={7} md={9} lg={10} xl={11}>
                    {saveError && <Error>{saveError}</Error>}
                </Grid>
            </Grid>
        </>
    );
};

export default Settings;
