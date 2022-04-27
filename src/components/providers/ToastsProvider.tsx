import React, { createContext, ReactNode, useContext, useState } from 'react';

type ToastProperties = {
    type: 'SUCCESS' | 'ERROR';
    key: string;
    title: string;
    body: string | string[];
    show: boolean;
};

type ToastContextValue = {
    toasts: ToastProperties[];
    addSuccess: (title: string, body: string | string[]) => void;
    addError: (title: string, body: string | string[]) => void;
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
    const key = `toast-${Date.now()}`;
    const addSuccess = (title: string, body: string | string[]) => {
        addToast({
            type: 'SUCCESS',
            key,
            title,
            body,
            show: true,
        });
    };
    const addError = (title: string, body: string | string[]) => {
        addToast({
            type: 'ERROR',
            key,
            title,
            body,
            show: true,
        });
    };
    const cleanUpHiddenToast = () => {
        setToasts((toasts) => toasts.filter((toast) => toast.show));
    };
    const removeToast = (index: number) => {
        setToasts((toasts) => {
            const updatedToasts = [...toasts];
            if (index > updatedToasts.length - 1) {
                return toasts;
            }
            updatedToasts[index].show = false;
            return updatedToasts;
        });
        setTimeout(cleanUpHiddenToast, 1000);
    };
    return <ToastContext.Provider value={{ toasts, addSuccess, addError, removeToast }}>{children}</ToastContext.Provider>;
};

export default ToastProvider;
