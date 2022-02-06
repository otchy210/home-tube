import React, { useRef, useEffect } from 'react';
import { Button, Image, Modal } from 'react-bootstrap';

const takeSnapshot = (video: HTMLVideoElement, canvas: HTMLCanvasElement, image: HTMLImageElement) => {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) {
        return;
    }
    context.drawImage(video, 0, 0);
    image.setAttribute('src', canvas.toDataURL());
};

type Props = {
    show: boolean;
    setShow: (show: boolean) => void;
    video: HTMLVideoElement | null;
    updateSnapshot: (canvas: HTMLCanvasElement) => void;
};

const SnapshotPreview: React.FC<Props> = ({ show, setShow, video, updateSnapshot }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    useEffect(() => {
        let count = 0;
        const drawCanvas = () => {
            if (!show || !video) {
                return;
            }
            const image = imageRef.current;
            const canvas = canvasRef.current;
            if (!canvas || !image) {
                count++;
                if (count > 10) {
                    throw new Error("Can't load canvas.");
                }
                setTimeout(drawCanvas, 10);
                return;
            }
            takeSnapshot(video, canvas, image);
        };
        drawCanvas();
    }, [show, video, canvasRef.current]);
    const onHide = () => {
        setShow(false);
    };
    const onUpdate = () => {
        if (canvasRef.current) {
            updateSnapshot(canvasRef.current);
        }
        onHide();
    };
    if (!video) {
        onHide();
        return null;
    }
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>Snapshot preview</Modal.Header>
            <Modal.Body>
                <canvas ref={canvasRef} className="d-none" />
                <div>Are you sure to update the snapshot representing this video with following image?</div>
                <div className="mt-3">
                    <Image fluid ref={imageRef} rounded thumbnail />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SnapshotPreview;
