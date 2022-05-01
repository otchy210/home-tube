import { VideoDetails, VideoValues } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useRef, useState } from 'react';
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

type DigestState = 'none' | 'started' | 'loading' | 'playing';

const OPACITY_MAP: Record<DigestState, number> = {
    none: 1,
    started: 0.5,
    loading: 0.5,
    playing: 0,
};

type Props = {
    video: VideoValues;
};

const VideoCardImg: React.FC<Props> = ({ video }: Props) => {
    const { key, duration, size } = video;
    const [digestState, setDigestState] = useState<DigestState>('none');
    const [details, setDetails] = useState<VideoDetails>();
    const [digestStyle, setDigestStyle] = useState<React.CSSProperties>();
    const [srcList, setSrcList] = useState<string[]>();
    const imageRef = useRef<HTMLImageElement>(null);
    const cardImgRef = useRef<HTMLDivElement>(null);
    const api = useApi();
    const { hoveringCardImg } = useVideoAlbumContext();

    useEffect(() => {
        if (hoveringCardImg === cardImgRef.current) {
            if (srcList) {
                setDigestState('playing');
            } else {
                setDigestState('started');
            }
        } else {
            setDigestState('none');
            setDigestStyle({});
        }
    }, [hoveringCardImg]);

    useEffect(() => {
        if (digestState !== 'started') {
            return;
        }
        setDigestState('loading');
        api.getDetails(key).then(setDetails);
    }, [digestState]);

    useEffect(() => {
        if (digestState !== 'loading' || !details) {
            return;
        }
        const length = details.length;
        if (!length) {
            setDigestState('none');
            return;
        }
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
        const srcList = Array(Math.trunc((length - 1) / 60) + 1)
            .fill('')
            .map((_, minute) => minute)
            .filter((minute) => minute % eachMinute === 0)
            .map((minute) => {
                return api.getThumbnailsUrl(key, minute.toString());
            })
            .slice(0, MAX_SCENES);
        loadAllImages(srcList).then(() => {
            setDigestState('playing');
            setSrcList(srcList);
        });
    }, [digestState, details]);

    useEffect(() => {
        if (digestState !== 'playing' || !details || !srcList || !imageRef.current) {
            return;
        }

        const rect = imageRef.current.getBoundingClientRect();
        const maxWidth = rect.right - rect.left;
        const maxHeight = rect.bottom - rect.top;

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
            setDigestStyle(digestStyle);
            frame++;
        }, SCENE_FRAME_SPEED) as unknown as number;
        return () => {
            clearInterval(tid);
        };
    }, [srcList, digestState]);

    return (
        <VideoCardImgWrapper className="card-img-top" ref={cardImgRef}>
            <Digest style={digestStyle} />
            <Image src={api.getSnapshotUrl(key)} style={{ opacity: OPACITY_MAP[digestState] }} ref={imageRef} />
            <BadgeHolder>
                {duration && <SmallBadge>{duration}</SmallBadge>}
                {size && <SmallBadge>{size}</SmallBadge>}
            </BadgeHolder>
            {(digestState === 'started' || digestState === 'loading') && (
                <SpinnerWrapper>
                    <Spinner />
                </SpinnerWrapper>
            )}
        </VideoCardImgWrapper>
    );
};

export default VideoCardImg;
