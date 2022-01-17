import React from 'react';
import { Button, Modal } from 'react-bootstrap';

type Props = {
    tags: string[] | undefined;
    show: boolean;
    setShow: (show: boolean) => void;
    updateTags: (tags: string[]) => void;
};

const TagsEditor: React.FC<Props> = ({ show, setShow, updateTags }: Props) => {
    const onHide = () => {
        // TODO: check if it's updated
        setShow(false);
    };
    const onSubmit = () => {
        updateTags([]);
        onHide();
    };
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>Edit tags</Modal.Header>
            <Modal.Body>modal body</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TagsEditor;
