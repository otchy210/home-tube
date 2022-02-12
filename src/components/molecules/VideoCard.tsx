import React, { useState } from 'react';
import { VideoValues } from '@otchy/home-tube-api/dist/types';
import { Card } from 'react-bootstrap';
import { createSearchParams, Link } from 'react-router-dom';
import VideoCardImg from '../atoms/VideoCardImg';
import StarsIndicator from './StarsIndicator';
import { useApi } from '../providers/ApiProvider';
import { loadAllImages } from '../../utils/ImageUtils';

const noDecorationStyle = { textDecoration: 'none', color: 'inherit' };

const maxScenes = 4;

type Props = {
    video: VideoValues;
};

const VideoCard: React.FC<Props> = ({ video }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [opacity, setOpacity] = useState<number>(1);
    const api = useApi();
    const { key, name, stars } = video;
    const viewUrl = `/view?${createSearchParams({ key })}`;
    const setState = (loading: boolean, opacity: number) => {
        setLoading(loading);
        setOpacity(opacity);
    };
    const onMouseOver = async (mouseOverEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setState(true, 0.5);
        const details = await api.getDetails(key);
        const length = details.length;
        if (!length) {
            setState(false, 1);
            return;
        }
        const eachMinute = (() => {
            for (let i = 1; i < 150; i++) {
                const min = i * maxScenes + 1;
                const sec = 60 * min;
                if (length < sec) {
                    return i;
                }
            }
            return 150;
        })();
        const srcList = Array(Math.trunc((length - 1) / 60) + 1)
            .fill('')
            .map((_, minute) => minute)
            .filter((minute) => minute % eachMinute === 0)
            .map((minute) => {
                return api.getThumbnailsUrl(key, minute.toString());
            })
            .slice(0, maxScenes);
        await loadAllImages(srcList);
        setState(false, 0);

        let frame = 0;
        const maxSceneFrames = 5;
        const tid = setInterval(() => {
            const sceneFrame = frame % maxSceneFrames;
            const srcIndex = Math.trunc(frame / maxSceneFrames) % maxScenes;
            const src = srcList[srcIndex];
            frame++;
        }, 1000) as unknown as number;

        const onMouseMove = (e: MouseEvent) => {
            if (mouseOverEvent.target === e.target) {
                return;
            }
            setState(false, 1);
            clearInterval(tid);
            document.body.removeEventListener('mousemove', onMouseMove);
        };
        document.body.addEventListener('mousemove', onMouseMove);
    };
    return (
        <Card className="mt-4">
            <Link to={viewUrl} style={noDecorationStyle} onMouseOver={onMouseOver}>
                <VideoCardImg video={video} loading={loading} opacity={opacity} />
            </Link>
            <Card.Body>
                <Card.Title className="fs-6 text-truncate" title={name}>
                    <Link to={viewUrl} style={noDecorationStyle}>
                        {name}
                    </Link>
                </Card.Title>
                <Card.Subtitle className="text-muted">
                    <StarsIndicator size={16} stars={stars} />
                </Card.Subtitle>
            </Card.Body>
        </Card>
    );
};

export default VideoCard;
