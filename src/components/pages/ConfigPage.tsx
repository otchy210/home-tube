import { AppConfig, ServerStatus, Storage } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Form, Row, Stack } from 'react-bootstrap';
import styled from 'styled-components';
import { getAppConfigDeepCopy } from '../../utils/ObjectUtils';
import DelayedSpinner from '../molecules/DelayedSpinner';
import { useApi } from '../providers/ApiProvider';
import { useToast } from '../providers/ToastsProvider';
import Reload from '../../images/reload.svg';
import Spinner from '../atoms/Spinner';
import { waitFor } from '../../utils/TimerUtils';
import { useI18n } from '../providers/I18nProvider';

/*
Translations for type StorageMonitorStatus = 'initialized' | 'reading' | 'waiting' | 'stopped';
t('initialized') t('reading') t('waiting') t('stopped')
*/

const Title = styled.p.attrs({ className: 'h1 pt-3' })``;

const PropertyTitle = styled.p.attrs({ className: 'h5 mt-3' })``;

const ReloadIcon = styled(Reload).attrs({ width: 32, height: 32 })`
    cursor: pointer;
`;

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

const ConfigPage: React.FC = () => {
    const [appConfig, setAppConfig] = useState<AppConfig>();
    const [serverStatus, setServerStatus] = useState<ServerStatus>();
    const [updated, setUpdated] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [storageValidationErrors, setStorageValidationErrors] = useState<StorageValidatinErrors>(new Map<number, string>());
    const { translationReady, t } = useI18n();
    const api = useApi();
    const toast = useToast();
    const loadAppConfig = () => {
        api.getAppConfig()
            .then(setAppConfig)
            .catch((e) => {
                console.error(e);
                toast.addError(t('Config page'), t('Failed to load.'));
                setHasError(true);
            });
        setUpdated(false);
        setStorageValidationErrors(new Map<number, string>());
    };
    const loadServerStatus = () => {
        setServerStatus(undefined);
        Promise.all([api.getServerStatus(), waitFor(500)]).then(([serverStatus]) => {
            setServerStatus(serverStatus);
        });
    };
    useEffect(() => {
        loadAppConfig();
        loadServerStatus();
    }, []);
    if (!translationReady) {
        return null;
    }
    if (!appConfig) {
        return (
            <>
                <Title>{t('Config')}</Title>
                <p>{!hasError && <DelayedSpinner />}</p>
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
        if (storageValidationErrors.size > 0) {
            return;
        }
        api.postAppConfig(appConfig)
            .then(() => {
                toast.addSuccess(t('Config page'), t('Updated successfully.'));
                setUpdated(false);
                loadServerStatus();
            })
            .catch((e) => {
                console.error(e);
                toast.addError(t('Config page'), t('Failed to update.'));
            });
    };
    return (
        <>
            <Row>
                <Col xs={12} lg={7}>
                    <Title>{t('Config')}</Title>
                    <Form>
                        <PropertyTitle>{t('Video storage path')}</PropertyTitle>
                        <Form.Text className="text-muted">{t('Add your video storage path which has your videos.')}</Form.Text>
                        {appConfig.storages.map((storage, i) => {
                            return (
                                <Stack key={`storage-${i}`}>
                                    <Stack direction="horizontal" gap={2} className="mt-1">
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
                                            className="text-nowrap"
                                            label={t('enabled')}
                                            checked={storage.enabled}
                                            onChange={(e) => {
                                                updateStorageEnabled(i, e.target.checked);
                                            }}
                                            id={`storage-${i}-enabled`}
                                            data-testid={`storage-${i}-enabled`}
                                        />
                                        <Button
                                            variant="danger"
                                            className="text-nowrap"
                                            onClick={() => {
                                                removeStorage(i);
                                            }}
                                            data-testid={`storage-${i}-delete`}
                                        >
                                            {t('Delete')}
                                        </Button>
                                    </Stack>
                                    {storageValidationErrors.has(i) ? <Form.Text className="text-danger">{storageValidationErrors.get(i)}</Form.Text> : null}
                                </Stack>
                            );
                        })}
                        <Stack direction="horizontal" gap={2} className="mt-1">
                            <Button variant="secondary" onClick={addStorage} data-testid={`add-storage`}>
                                {t('Add video storage path')}
                            </Button>
                        </Stack>

                        <PropertyTitle>{t('ffmpeg path')}</PropertyTitle>
                        <Form.Text className="text-muted">{t('No need to set unless you want to change it from default.')}</Form.Text>
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
                                {t('Save config')}
                            </Button>
                            <Button
                                variant="link"
                                onClick={() => {
                                    loadAppConfig();
                                }}
                                disabled={!updated}
                                data-testid="cancel"
                            >
                                {t('Cancel')}
                            </Button>
                        </Stack>
                    </Form>{' '}
                </Col>
                <Col xs={12} lg={5} className="ps-lg-5">
                    {' '}
                    <Title>
                        {t('Server status')} <ReloadIcon onClick={loadServerStatus} />
                    </Title>
                    {!serverStatus && <Spinner />}
                    {serverStatus && (
                        <>
                            <PropertyTitle>{t('Searchable videos')}</PropertyTitle>
                            <p>{serverStatus.indexedVideo}</p>
                            <PropertyTitle>{t('Storages')}</PropertyTitle>
                            {Object.entries(serverStatus.storages).map(([path, info]) => {
                                const badgeBg = (() => {
                                    switch (info.status) {
                                        case 'initialized':
                                            return 'primary';
                                        case 'waiting':
                                            return 'secondary';
                                        case 'reading':
                                            return 'warning';
                                        case 'stopped':
                                            return 'danger';
                                    }
                                })();
                                return (
                                    <p key={`storage-${path}`}>
                                        <b>{path}</b>
                                        <br />
                                        <Badge bg={badgeBg}>{t(info.status)}</Badge>{' '}
                                        {info.size > 0 ? t('{{count}} movies found.', { count: info.size }) : t('Movies not found.')}
                                        <br />
                                    </p>
                                );
                            })}
                            <PropertyTitle>{t('Meta data')}</PropertyTitle>
                            <p>
                                {serverStatus.meta.count > 0 ? t('{{count}} movies queued.', { count: serverStatus.meta.count }) : t('No movies queued.')}
                                <br />
                                {serverStatus.meta.current && `${t('Processing')}: "${serverStatus.meta.current}"`}
                            </p>
                            <PropertyTitle>{t('Thumbnails')}</PropertyTitle>
                            <p>
                                {serverStatus.thumbnails.count > 0
                                    ? t('{{count}} movies queued.', { count: serverStatus.thumbnails.count })
                                    : t('No movies queued.')}
                                <br />
                                {serverStatus.thumbnails.current && `${t('Processing')}: "${serverStatus.thumbnails.current}"`}
                            </p>
                            <PropertyTitle>{t('Snapshot')}</PropertyTitle>
                            <p>
                                {serverStatus.snapshot.count > 0
                                    ? t('{{count}} movies queued.', { count: serverStatus.snapshot.count })
                                    : t('No movies queued.')}
                                <br />
                                {serverStatus.snapshot.current && `${t('Processing')}: "${serverStatus.snapshot.current}"`}
                            </p>
                        </>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default ConfigPage;
