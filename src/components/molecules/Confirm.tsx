import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ButtonVariant } from 'react-bootstrap/esm/types';

type Props = {
    show: boolean;
    setShow: (show: boolean) => void;
    title?: string;
    body?: string;
    submit?: {
        variant: ButtonVariant;
        label: string;
        onClick: () => void;
    };
};

const Confirm: React.FC<Props> = ({ show, setShow, title, body, submit }: Props) => {
    const onHide = () => setShow(false);
    const onSubmit = () => {
        submit?.onClick();
        onHide();
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>{title && <Modal.Title>{title}</Modal.Title>}</Modal.Header>
            {body && <Modal.Body>{body}</Modal.Body>}
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
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
