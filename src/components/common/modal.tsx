import * as bootstrap from 'bootstrap';
import React, { useEffect, useRef } from 'react';
import { CloseButton } from './buttons';
import { ClassModifiedDiv } from './ClassModifiedElements';
import { HTMLDivProps } from './types';

type ModalProps = HTMLDivProps & {
    show?: boolean;
    onHide?: () => void;
};

export const Modal: React.FC<ModalProps> = ({ show, onHide, children, ...rest }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const bsModalRef = useRef<bootstrap.Modal>();
    useEffect(() => {
        const modalEl = modalRef.current!;
        const bsModal = new bootstrap.Modal(modalEl);
        bsModalRef.current = bsModal;
        const onHideModal = () => {
            onHide && onHide();
        };
        modalEl.addEventListener('hidden.bs.modal', onHideModal);
        return () => {
            modalEl.removeEventListener('hidden.bs.modal', onHideModal);
            bsModal.dispose();
        };
    }, [modalRef]);
    useEffect(() => {
        const bsModal = bsModalRef.current;
        if (!bsModal) {
            return;
        }
        if (show) {
            bsModal.show();
        } else {
            bsModal.hide();
        }
    }, [bsModalRef, show]);
    return (
        <ClassModifiedDiv classModifier="modal fade" ref={modalRef} {...rest}>
            <ClassModifiedDiv classModifier="modal-dialog">
                <ClassModifiedDiv classModifier="modal-content">{children}</ClassModifiedDiv>
            </ClassModifiedDiv>
        </ClassModifiedDiv>
    );
};

type ModalHeaderProps = HTMLDivProps & {
    closeButton?: boolean;
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({ closeButton, children, ...rest }) => {
    return (
        <ClassModifiedDiv classModifier="modal-header" {...rest}>
            {children}
            {closeButton && <CloseButton data-bs-dismiss="modal" />}
        </ClassModifiedDiv>
    );
};

export const ModalTitle: React.FC<HTMLDivProps> = (props) => {
    return <ClassModifiedDiv classModifier="modal-title h4" {...props} />;
};

export const ModalBody: React.FC<HTMLDivProps> = (props) => {
    return <ClassModifiedDiv classModifier="modal-body" {...props} />;
};

type ModalFooterProps = HTMLDivProps;

export const ModalFooter: React.FC<ModalFooterProps> = (props) => {
    return <ClassModifiedDiv classModifier="modal-footer" {...props} />;
};
