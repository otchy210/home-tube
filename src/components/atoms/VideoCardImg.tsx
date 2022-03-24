import { VideoValues } from '@otchy/home-tube-api/dist/types';
import React, { useRef, useState } from 'react';
import { Badge } from 'react-bootstrap';
import { useApi } from '../providers/ApiProvider';
import styled from 'styled-components';
import Spinner from './Spinner';
import { getThumbnailStyle, loadAllImages } from '../../utils/ImageUtils';

const VideoCardImgWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    background-color: #000;
`;

const Digest = styled.div`
    display: inline-block;
    position: absolute;
    background-color: #000;
    transform-origin: top center;
    pointer-events: none;
`;

const Image = styled.img`
    pointer-events: none;
    max-width: 100%;
`;

const BadgeHolder = styled.div.attrs({ className: 'hstack m-1' })`
    position: absolute;
    right: 0;
    bottom: 0;
    opacity: 0.8;
    pointer-events: none;
`;

const SmallBadge = styled(Badge).attrs({ className: 'ms-1 bg-secondary fw-normal text-uppercase' })``;

const SpinnerWrapper = styled.div`
    position: absolute;
    display: inline-block;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
`;

const maxScenes = 8;
const maxSceneFrames = 4;
const sceneFrameSpeed = 250;

type Props = {
    video: VideoValues;
};

const VideoCardImg: React.FC<Props> = ({ video }: Props) => {
    const { key, duration, size } = video;
    const [loading, setLoading] = useState<boolean>(false);
    const [opacity, setOpacity] = useState<number>(1);
    const [digestStyle, setDigestStyle] = useState<React.CSSProperties>();
    const imageRef = useRef<HTMLImageElement>(null);
    const api = useApi();
    const setState = (loading: boolean, opacity: number) => {
        setLoading(loading);
        setOpacity(opacity);
    };
    const onMouseOver = async (mouseOverEvent: MouseEvent) => {
        const image = imageRef.current;
        if (!image) {
            return;
        }
        const rect = image.getBoundingClientRect();
        const maxWidth = rect.right - rect.left;
        const maxHeight = rect.bottom - rect.top;

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
        const tid = setInterval(() => {
            const sec = frame % maxSceneFrames;
            const srcIndex = Math.trunc(frame / maxSceneFrames) % srcList.length;
            const src = srcList[srcIndex];
            const digestStyle = getThumbnailStyle({
                src,
                sec,
                width: details.width ?? 0,
                height: details.height ?? 0,
                maxWidth,
                maxHeight,
            });
            if (imageRef.current) {
                // avoid setting state after unmount
                setDigestStyle(digestStyle);
            }
            frame++;
        }, sceneFrameSpeed) as unknown as number;

        const onMouseMove = (e: MouseEvent) => {
            if (mouseOverEvent.target === e.target) {
                return;
            }
            if (imageRef.current) {
                // avoid setting state after unmount
                setState(false, 1);
                setDigestStyle({});
            }
            clearInterval(tid);
            document.body.removeEventListener('mousemove', onMouseMove);
        };
        document.body.addEventListener('mousemove', onMouseMove);
    };
    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <VideoCardImgWrapper className="card-img-top" onMouseOver={onMouseOver as any}>
            <Digest style={digestStyle} />
            <Image src={api.getSnapshotUrl(key)} style={{ opacity }} ref={imageRef} />
            <BadgeHolder>
                {duration && <SmallBadge>{duration}</SmallBadge>}
                {size && <SmallBadge>{size}</SmallBadge>}
            </BadgeHolder>
            {loading && (
                <SpinnerWrapper>
                    <Spinner />
                </SpinnerWrapper>
            )}
        </VideoCardImgWrapper>
    );
};

export default VideoCardImg;
