import React, { ReactNode } from 'react';
import { DangerButton, PrimaryButton, SecondaryButton } from '../common/buttons';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../common/modal';
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
            <ModalHeader closeButton>{title && <ModalTitle>{title}</ModalTitle>}</ModalHeader>
            {children && <ModalBody>{children}</ModalBody>}
            <ModalFooter>
                <SecondaryButton onClick={onHide}>{t('Close')}</SecondaryButton>
                {submit && submit.variant === 'primary' && <PrimaryButton onClick={onSubmit}>{submit.label}</PrimaryButton>}
                {submit && submit.variant === 'danger' && <DangerButton onClick={onSubmit}>{submit.label}</DangerButton>}
            </ModalFooter>
        </Modal>
    );
};

export default Confirm;
