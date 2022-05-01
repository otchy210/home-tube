import { VideoValues } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { getThumbnailStyle, loadAllImages } from '../../utils/ImageUtils';
import { SecondaryBadge } from '../common/badges';
import Spinner from '../common/Spinner';
import { useApi } from '../providers/ApiProvider';
import { useVideoAlbumContext } from './VideoAlbum';

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

const SmallBadge = styled(SecondaryBadge).attrs({ className: 'ms-1 fw-normal text-uppercase' })``;

const SpinnerWrapper = styled.div`
    position: absolute;
    display: inline-block;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
`;

const MAX_SCENES = 8;
const MAX_SCENE_FRAMES = 4;
const SCENE_FRAME_SPEED = 250;

type Props = {
    video: VideoValues;
};

const VideoCardImg: React.FC<Props> = ({ video }: Props) => {
    const { key, duration, size } = video;
    const [loading, setLoading] = useState<boolean>(false);
    const [opacity, setOpacity] = useState<number>(1);
    const [digestStyle, setDigestStyle] = useState<React.CSSProperties>();
    const imageRef = useRef<HTMLImageElement>(null);
    const cardImgRef = useRef<HTMLDivElement>(null);
    const api = useApi();
    const { hoveringCardImg } = useVideoAlbumContext();
    const setState = (loading: boolean, opacity: number) => {
        setLoading(loading);
        setOpacity(opacity);
    };
    const srcList = useMemo(() => {
        const eachMinute = (() => {
            for (let i = 1; i < 150; i++) {
                const min = i * MAX_SCENES + 1;
                const sec = 60 * min;
                if (length < sec) {
                    return i;
                }
            }
            return 150;
        })();
        return Array(Math.trunc((length - 1) / 60) + 1)
            .fill('')
            .map((_, minute) => minute)
            .filter((minute) => minute % eachMinute === 0)
            .map((minute) => {
                return api.getThumbnailsUrl(key, minute.toString());
            })
            .slice(0, MAX_SCENES);
    }, [key]);

    useEffect(() => {
        if (hoveringCardImg === cardImgRef.current) {
            // console.log(video.name);
        }
    }, [hoveringCardImg]);

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
        await loadAllImages(srcList);
        setState(false, 0);

        let frame = 0;
        const tid = setInterval(() => {
            const sec = frame % MAX_SCENE_FRAMES;
            const srcIndex = Math.trunc(frame / MAX_SCENE_FRAMES) % srcList.length;
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
        }, SCENE_FRAME_SPEED) as unknown as number;

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
        <VideoCardImgWrapper className="card-img-top" onMouseOver={onMouseOver as any} ref={cardImgRef}>
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
