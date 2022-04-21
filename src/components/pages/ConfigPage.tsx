import { AppConfig, AppConfigValidationError, ServerStatus, Storage } from '@otchy/home-tube-api/dist/types';
import { TFunction } from 'i18next';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { useSetTitle } from '../../hooks/useSetTitle';
import Reload from '../../images/reload.svg';
import { getAppConfigDeepCopy } from '../../utils/ObjectUtils';
import { waitFor } from '../../utils/TimerUtils';
import Spinner from '../atoms/Spinner';
import { Badge } from '../common/badges';
import { DangerButton, LinkButton, SecondaryButton, SubmitButton } from '../common/buttons';
import { FormTextInput } from '../common/form';
import { HorizontalStack, VerticalStack } from '../common/layouts';
import { Row, Col } from '../common/layouts';
import DelayedSpinner from '../molecules/DelayedSpinner';
import ServerStatusProperty from '../molecules/ServerStatusProperty';
import { useApi } from '../providers/ApiProvider';
import { useI18n } from '../providers/I18nProvider';
import { useToast } from '../providers/ToastsProvider';

/*
Translations for type StorageMonitorStatus = 'initialized' | 'reading' | 'waiting' | 'stopped';
t('initialized') t('reading') t('waiting') t('stopped')
*/

/*
Translations for updating AppConfig error messages
t("Storage doesn't exist") t("ffmpeg command doesn't exist")
*/

const Title = styled.p.attrs({ className: 'h1 pt-3' })``;

const PropertyTitle = styled.p.attrs({ className: 'h5 mt-3' })``;

const ReloadIcon = styled(Reload).attrs({ width: 32, height: 32 })`
    cursor: pointer;
`;

const isAppConfigValidationErrors = (results: AppConfig | AppConfigValidationError[]): results is AppConfigValidationError[] => {
    return Array.isArray(results);
};

type StorageValidatinErrors = Map<number, string>;

export const validateStorages = (storages: Storage[], t: TFunction): StorageValidatinErrors => {
    const errors = new Map<number, string>();
    const seenPaths: { [path: string]: number[] } = {};
    storages.forEach((storage, index) => {
        const { path } = storage;
        if (path.length === 0) {
            errors.set(index, t('Path is empty.'));
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
                errors.set(index, t('Path is duplicated.'));
            });
        });
    return errors;
};

const ConfigPage: React.FC = () => {
    const [appConfig, setAppConfig] = useState<AppConfig>();
    const [serverStatus, setServerStatus] = useState<ServerStatus>();
    const [updated, setUpdated] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [storageValidationErrors, setStorageValidationErrors] = useState<StorageValidatinErrors>(new Map<number, string>());
    const { t } = useI18n();
    const api = useApi();
    const toast = useToast();
    useSetTitle(t('Config'));
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
        const storageValidationErrors = validateStorages(appConfig.storages, t);
        setStorageValidationErrors(storageValidationErrors);
        if (storageValidationErrors.size > 0) {
            return;
        }
        setSubmitting(true);
        api.postAppConfig(appConfig)
            .then((results) => {
                if (isAppConfigValidationErrors(results)) {
                    toast.addError(
                        t('Config page'),
                        results.map((result) => {
                            return `${t(result.message)}: ${result.source}`;
                        })
                    );
                } else {
                    toast.addSuccess(t('Config page'), t('Updated successfully.'));
                    setUpdated(false);
                    loadServerStatus();
                }
            })
            .catch((e) => {
                console.error(e);
                toast.addError(t('Config page'), t('Failed to update.'));
            })
            .finally(() => {
                setSubmitting(false);
            });
    };
    return (
        <>
            <Row>
                <Col width={[12, 12, 12, 7]}>
                    <Title>{t('Config')}</Title>
                    <Form>
                        <PropertyTitle>{t('Video storage path')}</PropertyTitle>
                        <Form.Text className="text-muted">{t('Add your video storage path which has your videos.')}</Form.Text>
                        {appConfig.storages.map((storage, i) => {
                            return (
                                <VerticalStack key={`storage-${i}`}>
                                    <HorizontalStack gap={2} className="mt-1">
                                        <FormTextInput
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
                                        <DangerButton
                                            onClick={() => {
                                                removeStorage(i);
                                            }}
                                            data-testid={`storage-${i}-delete`}
                                        >
                                            {t('Delete')}
                                        </DangerButton>
                                    </HorizontalStack>
                                    {storageValidationErrors.has(i) ? <Form.Text className="text-danger">{storageValidationErrors.get(i)}</Form.Text> : null}
                                </VerticalStack>
                            );
                        })}
                        <HorizontalStack gap={2} className="mt-1">
                            <SecondaryButton onClick={addStorage} data-testid={`add-storage`}>
                                {t('Add video storage path')}
                            </SecondaryButton>
                        </HorizontalStack>

                        <PropertyTitle>{t('ffmpeg path')}</PropertyTitle>
                        <Form.Text className="text-muted">{t('No need to set unless you want to change it from default.')}</Form.Text>
                        <FormTextInput
                            value={appConfig.ffmpeg}
                            className="mt-1"
                            onChange={(e) => {
                                updateFfmpeg(e.target.value);
                            }}
                            data-testid={`ffmpeg`}
                        />

                        <HorizontalStack gap={2} className="mt-3">
                            <SubmitButton disabled={!updated} submitting={submitting} data-testid="save-config" onClick={trySubmit}>
                                {t('Save config')}
                            </SubmitButton>
                            <LinkButton
                                onClick={() => {
                                    loadAppConfig();
                                }}
                                disabled={!updated || submitting}
                                data-testid="cancel"
                            >
                                {t('Cancel')}
                            </LinkButton>
                        </HorizontalStack>
                    </Form>{' '}
                </Col>
                <Col width={[12, 12, 12, 5]} className="ps-lg-5">
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
                                const badgeVariant = (() => {
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
                                        <Badge variant={badgeVariant}>{t(info.status)}</Badge>{' '}
                                        {info.size > 0 ? t('{{count}} movies found.', { count: info.size }) : t('Movies not found.')}
                                        <br />
                                    </p>
                                );
                            })}
                            <ServerStatusProperty title={t('Meta data')} status={serverStatus.meta} />
                            <ServerStatusProperty title={t('Thumbnails')} status={serverStatus.thumbnails} />
                            <ServerStatusProperty title={t('Snapshot')} status={serverStatus.snapshot} />
                            <ServerStatusProperty title={t('Recommended MP4')} status={serverStatus.mp4} />
                        </>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default ConfigPage;
