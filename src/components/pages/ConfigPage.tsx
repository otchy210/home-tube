import { AppConfig, Storage } from '@otchy/home-tube-api/dist/types';
import React, { ReactNode, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Button, Form, Stack } from 'react-bootstrap';
import { useApi } from '../../utils/ApiContext';
import { getAppConfigDeepCopy } from '../../utils/ObjectUtils';
import Spinner from '../atoms/Spinner';

const ConfigTitle: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <p className="h1 pt-3">{children}</p>;
};

const PropertyTitle: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <p className="h5 mt-3">{children}</p>;
};

const ConfigPage: React.FC = () => {
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [appConfig, setAppConfig] = useState<AppConfig | undefined>();
    const [loadError, setLoadError] = useState<string | undefined>();
    const [updated, setUpdated] = useState<boolean>(false);
    const api = useApi();
    const loadAppConfig = () => {
        api.getAppConfig()
            .then(setAppConfig)
            .catch((e) => {
                console.error(e);
                setLoadError('Failed to load app config');
            });
        setUpdated(false);
    };
    useEffect(() => {
        // don't show loading until 500msec to avoid frequent flashing
        setTimeout(() => {
            setShowLoading(true);
        }, 500);
        loadAppConfig();
    }, []);
    if (!appConfig) {
        return (
            <>
                <ConfigTitle>Config</ConfigTitle>
                <p>
                    {loadError && (
                        <Alert variant="danger">
                            <Alert.Heading>{loadError}</Alert.Heading>
                            <div>You may want to restart the server.</div>
                        </Alert>
                    )}
                    {!loadError && showLoading && <Spinner />}
                </p>
            </>
        );
    }
    const updateStorageValue = (i: number, updater: (storage: Storage) => void) => {
        const copy = getAppConfigDeepCopy(appConfig);
        if (copy.storages.length < i + 1) {
            return;
        }
        updater(copy.storages[i]);
        setAppConfig(copy);
        setUpdated(true);
    };
    const updateStoragePath = (i: number, value: string) => {
        updateStorageValue(i, (storage) => {
            storage.path = value;
        });
        setUpdated(true);
    };
    const updateStorageEnabled = (i: number, value: boolean) => {
        updateStorageValue(i, (storage) => {
            storage.enabled = value;
        });
        setUpdated(true);
    };
    const removeStorage = (i: number) => {
        const copy = getAppConfigDeepCopy(appConfig);
        if (copy.storages.length < i + 1) {
            return;
        }
        copy.storages.splice(i);
        setAppConfig(copy);
        setUpdated(true);
    };
    const addStorage = () => {
        const copy = getAppConfigDeepCopy(appConfig);
        copy.storages.push({
            path: '',
            enabled: true,
        });
        setAppConfig(copy);
        setUpdated(true);
    };
    const updateFfmpeg = (value: string) => {
        const copy = getAppConfigDeepCopy(appConfig);
        copy.ffmpeg = value;
        setAppConfig(copy);
        setUpdated(true);
    };
    return (
        <>
            <ConfigTitle>Config</ConfigTitle>
            <Form>
                <PropertyTitle>Video storage path</PropertyTitle>
                <Form.Text className="text-muted">Add your video storage path which has your videos.</Form.Text>
                {appConfig.storages.map((storage, i) => {
                    return (
                        <Stack direction="horizontal" gap={2} key={`storage-${i}`} className="mt-1">
                            <Form.Control
                                type="text"
                                value={storage.path}
                                onChange={(e) => {
                                    updateStoragePath(i, e.target.value);
                                }}
                            />
                            <Form.Check
                                type="checkbox"
                                label="enabled"
                                checked={storage.enabled}
                                onChange={(e) => {
                                    updateStorageEnabled(i, e.target.checked);
                                }}
                            />
                            <Button
                                variant="danger"
                                onClick={() => {
                                    removeStorage(i);
                                }}
                            >
                                Delete
                            </Button>
                        </Stack>
                    );
                })}
                <Stack direction="horizontal" gap={2} className="mt-1">
                    <Button variant="secondary" onClick={addStorage}>
                        Add video storage path
                    </Button>
                </Stack>

                <PropertyTitle>ffmpeg path</PropertyTitle>
                <Form.Text className="text-muted">No need to set unless you want to change it from default.</Form.Text>
                <Form.Control
                    type="text"
                    value={appConfig.ffmpeg}
                    className="mt-1"
                    onChange={(e) => {
                        updateFfmpeg(e.target.value);
                    }}
                />

                <Stack direction="horizontal" gap={2} className="mt-3">
                    <Button variant="primary" type="submit" disabled={!updated} data-testid="save-config">
                        Save config
                    </Button>
                    <Button
                        variant="link"
                        onClick={() => {
                            loadAppConfig();
                        }}
                        disabled={!updated}
                    >
                        Cancel
                    </Button>
                </Stack>
            </Form>
        </>
    );
};

export default ConfigPage;
