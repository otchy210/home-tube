import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useToast } from '../providers/ToastsProvider';

const Toasts: React.FC = () => {
    const { toasts, removeToast } = useToast();
    if (toasts.length === 0) {
        return null;
    }
    return (
        <ToastContainer position="top-end" className="me-3" style={{ marginTop: '80px', zIndex: 9 }}>
            {toasts.map((toast, index) => {
                const [bg, autohide] = ((type) => {
                    switch (type) {
                        case 'SUCCESS':
                            return ['primary', true];
                        case 'ERROR':
                            return ['danger', false];
                    }
                })(toast.type);
                const toastBody = <>{Array.isArray(toast.body) ? toast.body.map((line) => <div>{line}</div>) : <div>{toast.body}</div>}</>;
                return (
                    <Toast
                        show={toast.show}
                        delay={3000}
                        autohide={autohide}
                        onClose={() => {
                            removeToast(index);
                        }}
                        key={`toast-${index}`}
                        bg={bg}
                    >
                        <Toast.Header>
                            <strong className="me-auto">{toast.title}</strong>
                        </Toast.Header>
                        <Toast.Body>{toastBody}</Toast.Body>
                    </Toast>
                );
            })}
        </ToastContainer>
    );
};

export default Toasts;
