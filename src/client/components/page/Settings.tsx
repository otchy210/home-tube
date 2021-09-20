import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import i18nText from '../common/i18nText';
import { useState } from 'react';
import { useSettings } from '../common/useSettings';
import TargetFolder from './settings/TargetFolder';

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
        console.log({ copy, updatedTargetFolders });
        setSettings(copy);
    };
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4">{i18nText('Settings')}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">{i18nText('Target folders')}</Typography>
                </Grid>
                {settings.targetFolders?.map((path) => (
                    <TargetFolder path={path} key={path} />
                ))}
                <TargetFolder path="" isNew={true} addFolder={addFolder} addError={addError} />
            </Grid>
        </>
    );
};

export default Settings;
