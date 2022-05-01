import { VideoDetails } from '@otchy/home-tube-api/dist/types';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DangerAlert } from '../common/alert';
import { LinkButton, PrimaryButton, SecondaryButton, SubmitButton } from '../common/buttons';
import { FormTextInput } from '../common/form';
import { HorizontalStack } from '../common/layouts';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../common/modal';
import { useApi } from '../providers/ApiProvider';
import { useI18n } from '../providers/I18nProvider';
import { EditIcon } from './ViewPageIcons';

const PROHIBITED_CHARS = ['\\', '/', ':', '*', '?', '"', '<', '>', '|'];

const PROHIBITED_FILE_NAME_REFEX = new RegExp(`.*[\\${PROHIBITED_CHARS.join('\\')}].*`);

export const isProhibitedFileBase = (fileName: string): boolean => {
    return PROHIBITED_FILE_NAME_REFEX.test(fileName);
};

type SubmissionState = 'none' | 'submitting' | 'saved';

const parseName = (name: string) => {
    const index = name.lastIndexOf('.');
    return [name.slice(0, index), name.slice(index)];
};

type Props = {
    details: VideoDetails;
};

const VideoTitle: React.FC<Props> = ({ details }: Props) => {
    const { name, key } = details;
    const [givenBase, ext] = parseName(name);
    const [base, setBase] = useState<string>(givenBase);
    const [show, setShow] = useState<boolean>(false);
    const [submissionState, setSubmissionState] = useState<SubmissionState>('none');
    const [errors, setErrors] = useState<string[]>([]);
    const setError = (error: string) => {
        setErrors([error]);
    };
    const [newKey, setNewKey] = useState<string>('');
    const nameInputRef = useRef<HTMLInputElement>(null!);
    const openNewRef = useRef<HTMLButtonElement>(null!);
    const api = useApi();
    const { t } = useI18n();
    const navigate = useNavigate();

    const closable = submissionState === 'none';

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // cannot avoid using deprecated `e.keyCode` due to https://qiita.com/ledsun/items/31e43a97413dd3c8e38e
        if (e.keyCode === 13) {
            e.preventDefault();
            onSubmit();
            return;
        }
    };
    const onHide = () => {
        if (closable) {
            setBase(givenBase);
            setShow(false);
            setSubmissionState('none');
            setErrors([]);
        }
    };
    const onSubmit = () => {
        const trimmedBase = base.trim();
        if (trimmedBase.length === 0) {
            setError(t("File name shouldn't be empty."));
            return;
        }
        if (trimmedBase === givenBase) {
            setError(t("File name isn't changed."));
            return;
        }
        if (isProhibitedFileBase(trimmedBase)) {
            setErrors([t('Following letters are prohibited to use for file names.'), PROHIBITED_CHARS.join(' ')]);
            return;
        }
        setSubmissionState('submitting');
        api.postRename(key, `${trimmedBase}${ext}`)
            .then((values) => {
                setNewKey(values.key);
                setSubmissionState('saved');
                openNewRef.current.focus();
            })
            .catch(() => {
                setError(t('Failed to update.'));
                setSubmissionState('none');
            });
    };

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                onShow={() => {
                    nameInputRef.current.select();
                }}
            >
                <ModalHeader closeButton={closable}>{t('Edit file name')}</ModalHeader>
                <ModalBody>
                    {submissionState === 'saved' ? (
                        <>{t('The file name has been updated. Current URL is no longer avaiable.')}</>
                    ) : (
                        <>
                            <p>
                                {t(
                                    "You're about to change the file name. Make sure this operation will actually change the file name on the storage and move meta data files appropriately."
                                )}
                            </p>
                            <HorizontalStack>
                                <FormTextInput ref={nameInputRef} value={base} onChange={(e) => setBase(e.target.value)} onKeyDown={onKeyDown} />
                                <div className="ms-1 fs-5">{ext}</div>
                            </HorizontalStack>
                            {errors.length > 0 && (
                                <DangerAlert className="mt-3 mb-0">
                                    {errors.map((error) => (
                                        <div>{error}</div>
                                    ))}
                                </DangerAlert>
                            )}
                        </>
                    )}
                </ModalBody>
                <ModalFooter>
                    {submissionState === 'saved' ? (
                        <>
                            <LinkButton onClick={() => navigate('/')}>{t('Go to home')}</LinkButton>
                            <PrimaryButton
                                onClick={() => {
                                    location.replace(`/view?key=${newKey}`);
                                }}
                                ref={openNewRef}
                            >
                                {t('Open new URL')}
                            </PrimaryButton>
                        </>
                    ) : (
                        <>
                            {closable && <SecondaryButton onClick={onHide}>{t('Cancel')}</SecondaryButton>}
                            <SubmitButton submitting={submissionState === 'submitting'} onClick={onSubmit}>
                                {t('Change file name')}
                            </SubmitButton>
                        </>
                    )}
                </ModalFooter>
            </Modal>
            <div className="fs-4">
                {name}{' '}
                <EditIcon
                    onClick={() => {
                        setShow(true);
                    }}
                />
            </div>
        </>
    );
};

export default VideoTitle;
