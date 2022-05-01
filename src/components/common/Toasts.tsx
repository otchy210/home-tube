import React from 'react';
import { useToast } from '../providers/ToastsProvider';
import { Toast, ToastBody, ToastContainer, ToastHeader, ToastVariant } from './toast';

const Toasts: React.FC = () => {
    const { toasts, removeToast } = useToast();
    if (toasts.length === 0) {
        return null;
    }
    return (
        <ToastContainer className="me-3" style={{ marginTop: '80px', zIndex: 9 }}>
            {toasts.map((toast, index) => {
                const [bg, autohide] = ((type) => {
                    switch (type) {
                        case 'SUCCESS':
                            return ['primary' as ToastVariant, true];
                        case 'ERROR':
                            return ['danger' as ToastVariant, false];
                    }
                })(toast.type);
                const toastBody = (
                    <>{Array.isArray(toast.body) ? toast.body.map((line, i) => <div key={`toast-body-${i}`}>{line}</div>) : <div>{toast.body}</div>}</>
                );
                return (
                    <Toast
                        show={toast.show}
                        delay={3000}
                        autohide={autohide}
                        onClose={() => {
                            removeToast(index);
                        }}
                        key={toast.key}
                        variant={bg}
                    >
                        <ToastHeader>
                            <strong className="me-auto">{toast.title}</strong>
                        </ToastHeader>
                        <ToastBody>{toastBody}</ToastBody>
                    </Toast>
                );
            })}
        </ToastContainer>
    );
};

export default Toasts;
