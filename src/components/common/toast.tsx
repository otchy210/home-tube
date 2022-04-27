import * as bootstrap from 'bootstrap';
import React, { createContext, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { classNames } from '../../utils/classNames';
import { CloseButton } from './buttons';
import { ClassModifiedDiv } from './ClassModifiedElements';
import { HTMLDivProps } from './types';

export const ToastContainer: React.FC<HTMLDivProps> = (props) => {
    return <ClassModifiedDiv classModifier="toast-container position-absolute top-0 end-0" {...props} />;
};

type ToastContextProps = {
    autohide?: boolean;
    bsToastRef?: React.MutableRefObject<bootstrap.Toast | undefined>;
};

const ToastContext = createContext<ToastContextProps>({});

export type ToastVariant = 'primary' | 'danger';

type ToastProps = HTMLDivProps & {
    variant: ToastVariant;
    show: boolean;
    autohide: boolean;
    delay: number;
    onClose?: () => void;
};

export const Toast: React.FC<ToastProps> = ({ variant, show, autohide, delay, onClose, ...rest }) => {
    const toastRef = useRef<HTMLDivElement>(null);
    const bsToastRef = useRef<bootstrap.Toast>();

    useEffect(() => {
        const toastEl = toastRef.current!;
        const bsToast = new bootstrap.Toast(toastEl, { autohide, delay });
        bsToastRef.current = bsToast;
        const onCloseToast = () => {
            onClose && onClose();
        };
        toastEl.addEventListener('hidden.bs.toast', onCloseToast);
        return () => {
            toastEl.removeEventListener('hidden.bs.toast', onCloseToast);
            bsToast.dispose();
        };
    }, [toastRef]);

    useEffect(() => {
        const bsToast = bsToastRef.current;
        if (!bsToast) {
            return;
        }
        if (show) {
            bsToast.show();
        } else {
            bsToast.hide();
        }
    }, [bsToastRef, show]);

    const classModifier = classNames(`toast fade bg-${variant}`);
    return (
        <ToastContext.Provider value={{ autohide, bsToastRef }}>
            <ClassModifiedDiv classModifier={classModifier.build()!} ref={toastRef} {...rest} />
        </ToastContext.Provider>
    );
};

const RawToastHeader: React.FC<HTMLDivProps> = ({ children, ...rest }) => {
    const { autohide, bsToastRef } = useContext(ToastContext);
    return (
        <ClassModifiedDiv classModifier="toast-header" {...rest}>
            {children}
            {!autohide && <CloseButton onClick={() => bsToastRef?.current?.hide()} />}
        </ClassModifiedDiv>
    );
};

export const ToastHeader = styled(RawToastHeader)`
    background-color: transparent;
    color: #fff;
`;

export const ToastBody = styled.div.attrs({ className: 'toast-body' })`
    background-color: rgba(255, 255, 255, 0.85);
`;
