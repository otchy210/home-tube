import { Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import i18nText from '../../common/i18nText';
import { useState } from 'react';
import { useSettings } from '../../common/useSettings';
import TargetFolder from './settings/TargetFolder';
import TextInput from '../common/TextInput';
import RegularButton from '../common/RegularButton';
import SaveIcon from '@material-ui/icons/Save';

const copySettings = (settings: Settings): Settings => {
    const copy = { ...settings };
    return copy;
};

const updateTargetFolders = (settings: Settings, updatedTargetFolders: string[]): Settings => {
    const copy = copySettings(settings);
    copy.targetFolders = updatedTargetFolders;
    return copy;
};

const Settings: React.FC<{}> = () => {
    const [settings, setSettings] = useState<Settings>(useSettings() || {});
    const [addError, setAddError] = useState<string>('');
    const [isModified, setIsModified] = useState<boolean>(false);
    const addFolder = (path: string) => {
        if (!path || path.trim().length === 0) {
            setAddError(i18nText('No folder path set.'));
            return;
        }
        const targetFolders = settings.targetFolders || [];
        if (targetFolders.includes(path)) {
            setAddError(i18nText('Duplicate folder path set.'));
            return;
        }
        const updatedTargetFolders = [...targetFolders];
        updatedTargetFolders.push(path);
        const copy = updateTargetFolders(settings, updatedTargetFolders);
        setSettings(copy);
        setIsModified(true);
    };
    const removeFolder = (path: string) => {
        if (!path || path.trim().length === 0) {
            setAddError(i18nText('No folder path set.'));
            return;
        }
        const targetFolders = settings.targetFolders || [];
        const index = targetFolders.indexOf(path);
        if (index < 0) {
            return;
        }
        const updatedTargetFolders = [...targetFolders];
        updatedTargetFolders.splice(index, 1);
        const copy = updateTargetFolders(settings, updatedTargetFolders);
        setSettings(copy);
        setIsModified(true);
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
                    <TextInput value={settings.apiPort} />
                </Grid>
                <Grid item xs={12} sm={7} md={9} lg={10} xl={11}>
                    {i18nText('DO NOT CHANGE unless you know what it is.')}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">{i18nText('Target folders')}</Typography>
                </Grid>
                {settings.targetFolders?.map((path) => (
                    <TargetFolder path={path} key={path} removeFolder={removeFolder} />
                ))}
                <TargetFolder path="" isNew={true} addFolder={addFolder} addError={addError} />
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={5} md={3} lg={2} xl={1}>
                    <RegularButton color="primary" startIcon={<SaveIcon />} disabled={!isModified}>
                        {i18nText('Save settings')}
                    </RegularButton>
                </Grid>
            </Grid>
        </>
    );
};

export default Settings;
