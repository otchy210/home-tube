import { VideoDetails } from '@otchy/home-tube-api/dist/types';
import React, { useRef, useEffect, useState } from 'react';
import { Badge, Button, Col, Container, Image, Modal, Row } from 'react-bootstrap';
import styled from 'styled-components';
import RightArrow from '../../images/right-arrow.svg';
import SubmitButton from '../atoms/SubmitButton';
import { useApi } from '../providers/ApiProvider';
import { useI18n } from '../providers/I18nProvider';

const ImageHolder = styled.div`
    position: relative;

    & .badge {
        position: absolute;
        left: 0;
        top: 0;
    }
`;

const ArrowHolder = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 32px;
    height: 32px;
    margin: 0;
    padding: 0;
    background-color: rgb(var(--bs-primary-rgb));
    border-radius: 50%;
    border: solid 6px #fff;
    transform: translate(-50%, -50%);
    box-sizing: content-box;
`;

const RightArrowIcon = styled(RightArrow)`
    width: 24px;
    height: 24px;
    margin: 4px;
`;

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
    details: VideoDetails;
    video: HTMLVideoElement | null;
    updateSnapshot: (canvas: HTMLCanvasElement) => Promise<void>;
};

const SnapshotPreview: React.FC<Props> = ({ show, setShow, details, video, updateSnapshot }) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const { t } = useI18n();
    const api = useApi();
    const snapshotUrl = api.getSnapshotUrl(details.key);
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
            setSubmitting(true);
            updateSnapshot(canvasRef.current).then(() => {
                setSubmitting(false);
                onHide();
            });
        } else {
            onHide();
        }
    };
    if (!video) {
        onHide();
        return null;
    }
    return (
        <Modal show={show} onHide={onHide} size="xl">
            <Modal.Header closeButton>{t('Snapshot preview')}</Modal.Header>
            <Modal.Body>
                <canvas ref={canvasRef} className="d-none" />
                <div>{t('Are you sure to update the snapshot representing this video with following image?')}</div>
                <Container className="mt-2">
                    <Row style={{ position: 'relative' }}>
                        <Col xs={6} className="px-1">
                            <ImageHolder>
                                <Image fluid ref={imageRef} rounded src={snapshotUrl} />
                                <Badge bg="secondary" className="m-1">
                                    {t('Current', { context: 'snapshot' })}
                                </Badge>
                            </ImageHolder>
                        </Col>
                        <Col xs={6} className="px-1">
                            <ImageHolder>
                                <Image fluid ref={imageRef} rounded />
                                <Badge bg="primary" className="m-1">
                                    {t('Replacement', { context: 'snapshot' })}
                                </Badge>
                            </ImageHolder>
                        </Col>
                        <ArrowHolder>
                            <RightArrowIcon />
                        </ArrowHolder>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    {t('Cancel')}
                </Button>
                <SubmitButton submitting={submitting} onClick={onUpdate}>
                    {t('Update')}
                </SubmitButton>
            </Modal.Footer>
        </Modal>
    );
};

export default SnapshotPreview;
