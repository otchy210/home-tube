import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import styled from 'styled-components';
import { useToast } from '../providers/ToastsProvider';

const ToastHeader = styled(Toast.Header)`
    background-color: transparent;
    color: #fff;
`;

const ToastBody = styled(Toast.Body)`
    background-color: rgba(255, 255, 255, 0.85);
`;

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
                        key={`toast-${index}`}
                        bg={bg}
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
