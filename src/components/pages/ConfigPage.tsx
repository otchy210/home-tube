import { AppConfig, Storage } from '@otchy/home-tube-api/dist/types';
import React, { ReactNode, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Button, Form, Stack } from 'react-bootstrap';
import { useApi } from '../../utils/ApiContext';
import { getAppConfigDeepCopy } from '../../utils/ObjectUtils';
import Spinner from '../atoms/Spinner';

type StorageValidatinErrors = Map<number, string>;

export const validateStorages = (storages: Storage[]): StorageValidatinErrors => {
    const errors = new Map<number, string>();
    const seenPaths: { [path: string]: number[] } = {};
    storages.forEach((storage, index) => {
        const { path } = storage;
        if (path.length === 0) {
            errors.set(index, 'Path is empty.');
            return;
        }
        if (seenPaths[path] === undefined) {
            seenPaths[path] = [];
        }
        seenPaths[path].push(index);
    });
    Object.values(seenPaths)
        .filter((indexes) => indexes.length > 1)
        .forEach((indexes) => {
            indexes.forEach((index) => {
                errors.set(index, 'Path is duplicated.');
            });
        });
    return errors;
};

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
    const [storageValidationErrors, setStorageValidationErrors] = useState<StorageValidatinErrors>(new Map<number, string>());
    const api = useApi();
    const loadAppConfig = () => {
        api.getAppConfig()
            .then(setAppConfig)
            .catch((e) => {
                console.error(e);
                setLoadError('Failed to load app config');
            });
        setUpdated(false);
        setStorageValidationErrors(new Map<number, string>());
    };
    useEffect(() => {
        // don't show loading until 500msec to avoid frequent flashing
        const tid = setTimeout(() => {
            setShowLoading(true);
        }, 500);
        loadAppConfig();
        return () => {
            clearTimeout(tid);
        };
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
            storage.path = value.trim();
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
        copy.storages.splice(i, 1);
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
        copy.ffmpeg = value.trim();
        setAppConfig(copy);
        setUpdated(true);
    };
    const trySubmit = () => {
        const storageValidationErrors = validateStorages(appConfig.storages);
        setStorageValidationErrors(storageValidationErrors);
        if (Object.keys(storageValidationErrors).length > 0) {
            return;
        }
    };
    return (
        <>
            <ConfigTitle>Config</ConfigTitle>
            <Form>
                <PropertyTitle>Video storage path</PropertyTitle>
                <Form.Text className="text-muted">Add your video storage path which has your videos.</Form.Text>
                {appConfig.storages.map((storage, i) => {
                    return (
                        <Stack>
                            <Stack direction="horizontal" gap={2} key={`storage-${i}`} className="mt-1">
                                <Form.Control
                                    type="text"
                                    value={storage.path}
                                    isInvalid={storageValidationErrors.get(i) !== undefined}
                                    onChange={(e) => {
                                        updateStoragePath(i, e.target.value);
                                    }}
                                    data-testid={`storage-${i}-path`}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="enabled"
                                    checked={storage.enabled}
                                    onChange={(e) => {
                                        updateStorageEnabled(i, e.target.checked);
                                    }}
                                    data-testid={`storage-${i}-enabled`}
                                />
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        removeStorage(i);
                                    }}
                                    data-testid={`storage-${i}-delete`}
                                >
                                    Delete
                                </Button>
                            </Stack>
                            {storageValidationErrors.has(i) ? <Form.Text className="text-danger">{storageValidationErrors.get(i)}</Form.Text> : null}
                        </Stack>
                    );
                })}
                <Stack direction="horizontal" gap={2} className="mt-1">
                    <Button variant="secondary" onClick={addStorage} data-testid={`add-storage`}>
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
                    data-testid={`ffmpeg`}
                />

                <Stack direction="horizontal" gap={2} className="mt-3">
                    <Button variant="primary" disabled={!updated} data-testid="save-config" onClick={trySubmit}>
                        Save config
                    </Button>
                    <Button
                        variant="link"
                        onClick={() => {
                            loadAppConfig();
                        }}
                        disabled={!updated}
                        data-testid="cancel"
                    >
                        Cancel
                    </Button>
                </Stack>
            </Form>
        </>
    );
};

export default ConfigPage;
