import { VideoDetails } from '@otchy/home-tube-api/dist/types';
import React, { useState, useRef } from 'react';
import { Alert, Button, FormControl, Modal, Stack } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SubmitButton from '../atoms/SubmitButton';
import { EditIcon } from '../atoms/ViewPageIcons';
import { useApi } from '../providers/ApiProvider';
import { useI18n } from '../providers/I18nProvider';

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
    const nameInputRef = useRef<HTMLInputElement>(null);
    const api = useApi();
    const { t } = useI18n();

    const closable = submissionState === 'none';

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
                    nameInputRef.current?.select();
                }}
            >
                <Modal.Header closeButton={closable}>{t('Edit file name')}</Modal.Header>
                <Modal.Body>
                    {submissionState === 'saved' ? (
                        <>{t('The file name has been updated. Current URL is no longer avaiable.')}</>
                    ) : (
                        <>
                            <p>
                                {t(
                                    "You're about to change the file name. Make sure this operation will actually change the file name on the storage and move meta data files appropriately."
                                )}
                            </p>
                            <Stack direction="horizontal">
                                <FormControl ref={nameInputRef} value={base} onChange={(e) => setBase(e.target.value)} />
                                <div className="ms-1 fs-5">{ext}</div>
                            </Stack>
                            {errors.length > 0 && (
                                <Alert variant="danger" className="mt-3 mb-0">
                                    {errors.map((error) => (
                                        <div>{error}</div>
                                    ))}
                                </Alert>
                            )}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {submissionState === 'saved' ? (
                        <>
                            <LinkContainer to="/">
                                <Button variant="link">{t('Go to home')}</Button>
                            </LinkContainer>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    location.replace(`/view?key=${newKey}`);
                                }}
                            >
                                {t('Open new URL')}
                            </Button>
                        </>
                    ) : (
                        <>
                            {closable && (
                                <Button variant="secondary" onClick={onHide}>
                                    {t('Cancel')}
                                </Button>
                            )}
                            <SubmitButton submitting={submissionState === 'submitting'} onClick={onSubmit}>
                                {t('Change file name')}
                            </SubmitButton>
                        </>
                    )}
                </Modal.Footer>
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
