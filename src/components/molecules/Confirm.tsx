import React, { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';
import { DangerButton, PrimaryButton, SecondaryButton } from '../common/buttons';
import { useI18n } from '../providers/I18nProvider';

type Props = {
    show: boolean;
    setShow: (show: boolean) => void;
    title?: string;
    children?: ReactNode;
    submit?: {
        variant: 'primary' | 'danger';
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
                <SecondaryButton onClick={onHide}>{t('Close')}</SecondaryButton>
                {submit && submit.variant === 'primary' && <PrimaryButton onClick={onSubmit}>{submit.label}</PrimaryButton>}
                {submit && submit.variant === 'danger' && <DangerButton onClick={onSubmit}>{submit.label}</DangerButton>}
            </Modal.Footer>
        </Modal>
    );
};

export default Confirm;
