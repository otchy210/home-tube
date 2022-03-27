import React, { useState, useRef } from 'react';
import { Button, FormControl, Modal, Stack } from 'react-bootstrap';
import SubmitButton from '../atoms/SubmitButton';
import { EditIcon } from '../atoms/ViewPageIcons';
import { useI18n } from '../providers/I18nProvider';

type Props = {
    name: string;
};

const parseName = (name: string) => {
    const index = name.lastIndexOf('.');
    return [name.slice(0, index), name.slice(index)];
};

type SubmissionState = 'none' | 'submitting' | 'saved';

const VideoTitle: React.FC<Props> = ({ name }: Props) => {
    const [givenBase, ext] = parseName(name);
    const [base, setBase] = useState<string>(givenBase);
    const [show, setShow] = useState<boolean>(false);
    const [submissionState, setSubmissionState] = useState<SubmissionState>('none');
    const nameInputRef = useRef<HTMLInputElement>(null);
    const { t } = useI18n();

    const closable = submissionState === 'none';

    const onHide = () => {
        if (closable) {
            setBase(givenBase);
            setShow(false);
        }
    };
    const onSubmit = () => {
        setSubmissionState('submitting');
        // do update
        setTimeout(() => {
            setSubmissionState('saved');
        }, 500);
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
                <Modal.Header closeButton={closable}>{t('Edit name')}</Modal.Header>
                <Modal.Body>
                    {submissionState === 'saved' ? (
                        <>{t('The file name has been updated. So current URL is no longer avaiable.')}</>
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
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {submissionState === 'saved' ? (
                        <>
                            <Button variant="link">{t('Go to home')}</Button>
                            <Button variant="primary">{t('Open new URL')}</Button>
                        </>
                    ) : (
                        <>
                            {closable && (
                                <Button variant="secondary" onClick={onHide}>
                                    {t('Cancel')}
                                </Button>
                            )}
                            <SubmitButton submitting={submissionState === 'submitting'} onClick={onSubmit}>
                                {t('Save name')}
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
