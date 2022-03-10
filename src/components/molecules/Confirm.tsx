import React, { ReactNode } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ButtonVariant } from 'react-bootstrap/esm/types';
import { useI18n } from '../providers/I18nProvider';

type Props = {
    show: boolean;
    setShow: (show: boolean) => void;
    title?: string;
    children?: ReactNode;
    submit?: {
        variant: ButtonVariant;
        label: string;
        onClick: () => void;
    };
};

const Confirm: React.FC<Props> = ({ show, setShow, title, children, submit }: Props) => {
    const { t } = useI18n();
    const onHide = () => setShow(false);
    const onSubmit = () => {
        submit?.onClick();
        onHide();
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>{title && <Modal.Title>{title}</Modal.Title>}</Modal.Header>
            {children && <Modal.Body>{children}</Modal.Body>}
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    {t('Close')}
                </Button>
                {submit && (
                    <Button variant={submit.variant} onClick={onSubmit}>
                        {submit.label}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default Confirm;
