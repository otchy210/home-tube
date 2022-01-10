import React, { createContext, ReactNode, useContext, useState } from 'react';

type ToastProperties = {
    type: 'SUCCESS' | 'ERROR';
    title: string;
    body: string;
    show: boolean;
};

type ToastContextValue = {
    toasts: ToastProperties[];
    addSuccess: (title: string, body: string) => void;
    addError: (title: string, body: string) => void;
    removeToast: (index: number) => void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const ToastContext = createContext<ToastContextValue>({ toasts: [], addSuccess: () => {}, addError: () => {}, removeToast: () => {} });

export const useToast = (): ToastContextValue => {
    return useContext(ToastContext);
};

type Props = {
    children: ReactNode;
};

const ToastProvider: React.FC<Props> = ({ children }: Props) => {
    const [toasts, setToasts] = useState<ToastProperties[]>([]);
    const addToast = (newToast: ToastProperties) => {
        const updatedToasts = [...toasts, { ...newToast, show: true }];
        setToasts(updatedToasts);
    };
    const addSuccess = (title: string, body: string) => {
        addToast({
            type: 'SUCCESS',
            title,
            body,
            show: true,
        });
    };
    const addError = (title: string, body: string) => {
        addToast({
            type: 'ERROR',
            title,
            body,
            show: true,
        });
    };
    const cleanUpHiddenToast = () => {
        const updatedToasts = toasts.filter((toast) => {
            return toast.show;
        });
        if (updatedToasts.length > 0) {
            return;
        }
        setToasts([]);
    };
    const removeToast = (index: number) => {
        const updatedToasts = [...toasts];
        if (index > updatedToasts.length - 1) {
            return;
        }
        updatedToasts[index].show = false;
        setToasts(updatedToasts);
        setTimeout(cleanUpHiddenToast, 1000);
    };
    return <ToastContext.Provider value={{ toasts, addSuccess, addError, removeToast }}>{children}</ToastContext.Provider>;
};

export default ToastProvider;
