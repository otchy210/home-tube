import { VideoDetails } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useRef, useState } from 'react';
import { Stack } from 'react-bootstrap';
import styled, { css } from 'styled-components';
import Play from '../../images/play.svg';
import Pause from '../../images/pause.svg';
import Speaker from '../../images/speaker.svg';
import Theater from '../../images/theater.svg';
import Normal from '../../images/normal.svg';
import FullScreen from '../../images/full-screen.svg';
import { VideoViewMode } from '../../types';
import { formatTimeInSecond } from '@otchy/home-tube-api/dist/utils/TimeUtils';
import VideoThumbnail from '../molecules/VideoThumbnail';
import { useApi } from '../providers/ApiProvider';

const VideoWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    background-color: #000;
    width: 100%;
`;

const Video = styled.video`
    max-width: 100%;
`;

const VideoControl = styled(Stack)`
    height: 120px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
`;

const SeekBarWrapper = styled.div.attrs({ className: 'px-3 mt-auto' })`
    padding: 8px 0;
    cursor: pointer;
    transition: padding 0.2s;
    &:hover div.handle,
    &.dragging div.handle {
        width: 16px;
        height: 16px;
        transition: width 0.2s, height 0.2s;
    }
`;
const SeekBarOuter = styled.div.attrs({ className: 'rounded-pill' })`
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    pointer-events: none;
`;
const SeekBarInner = styled.div.attrs({ className: 'bar rounded-pill' })`
    height: 4px;
    background-color: #f90;
    pointer-events: none;
`;
const SeekHandle = styled.div.attrs({ className: 'rounded-circle handle' })`
    position: absolute;
    top: 2px;
    width: 4px;
    height: 4px;
    transform: translate(-50%, -50%);
    background-color: #f90;
    transition: width 0.2s, height 0.2s;
    pointer-events: none;
`;

const ICON_SIZE = 24;
const iconSttrs = {
    width: ICON_SIZE,
    height: ICON_SIZE,
};
const iconStyle = css`
    pointer-events: none;
`;
const PlayIcon = styled(Play).attrs(iconSttrs)`
    ${iconStyle};
`;
const PauseIcon = styled(Pause).attrs(iconSttrs)`
    ${iconStyle};
`;
const SpeakerIcon = styled(Speaker).attrs(iconSttrs)`
    ${iconStyle};
`;
const TheaterIcon = styled(Theater).attrs(iconSttrs)`
    ${iconStyle};
`;
const NormalIcon = styled(Normal).attrs(iconSttrs)`
    ${iconStyle};
`;
const FullScreenIcon = styled(FullScreen).attrs(iconSttrs)`
    ${iconStyle};
`;
const IconWrapper = styled.div.attrs({ className: 'm-0 p-1 p-sm-2 rounded-circle', role: 'button' })`
    position: relative;
    background-color: rgba(255, 255, 255, 0);
    transition: background-color 0.2s;
    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
        transition: background-color 0.2s;
        & > div {
            display: block;
        }
    }
`;
const IconTooltip = styled.div.attrs({ className: 'px-2 py-1 rounded text-nowrap text-white' })`
    position: absolute;
    transform: translate(-50%, -50px);
    left: 50%;
    background-color: rgba(0, 0, 0, 0.8);
    display: none;
`;
const FirstIconToolTip = styled(IconTooltip)`
    transform: translate(0, -50px);
    left: 0;
`;
const LastIconToolTip = styled(IconTooltip)`
    transform: translate(-100%, -50px);
    left: 100%;
`;
const Time = styled.div.attrs({ className: 'me-auto p-2 font-monospace text-white' })`
    font-size: 0.9rem;
    pointer-events: none;
`;

const modeProps: Record<VideoViewMode, [string, React.FC]> = {
    normal: ['Normal view', NormalIcon],
    theater: ['Theater mode', TheaterIcon],
    fullScreen: ['Full screen', FullScreenIcon],
};
const allVideoMode: VideoViewMode[] = ['normal', 'theater', 'fullScreen'];

type Props = {
    details: VideoDetails;
    mode: VideoViewMode;
    setMode: (mode: VideoViewMode) => void;
};

const VideoPlayer: React.FC<Props> = ({ details, mode, setMode }: Props) => {
    const videoKey = details.key;
    const length = details.length ?? 0;
    const [playing, setPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [currentPercentage, setCurrentPercentage] = useState<string>('0%');
    const [thumbnailLeft, setThumbnailLeft] = useState<number>(0);
    const [thumbnailDisplay, setThumbnailDisplay] = useState<string>('none');
    const videoRef = useRef<HTMLVideoElement>(null);
    const seekbarWrapperRef = useRef<HTMLDivElement>(null);
    const seekbarOuterRef = useRef<HTMLDivElement>(null);
    const thumbnailRef = useRef<HTMLDivElement>(null);
    const api = useApi();
    const src = api.getVideoUrl(videoKey);
    const duration = formatTimeInSecond(length);
    useEffect(() => {
        const video = videoRef.current;
        if (!video) {
            return;
        }
        let iid: number;
        const updateCurrent = () => {
            const currentTime = videoRef.current?.currentTime ?? 0;
            setCurrentTime(currentTime);
            setCurrentPercentage(`${(currentTime / length) * 100}%`);
        };
        updateCurrent();
        const onPlay = () => {
            setPlaying(true);
            iid = setInterval(updateCurrent, 10) as unknown as number;
        };
        const onPause = () => {
            setPlaying(false);
            clearInterval(iid);
        };
        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);

        let isDragging = false;
        let seekbarX = 0;
        let seekbarWidth = 0;
        let thumbnailWidth = 0;
        const onStartDragging = () => {
            if (!seekbarOuterRef.current || !thumbnailRef.current) {
                return;
            }
            const seekbarRect = seekbarOuterRef.current.getBoundingClientRect();
            seekbarX = seekbarRect.left + window.pageXOffset;
            seekbarWidth = seekbarRect.right - seekbarRect.left;
            setThumbnailDisplay('block');
            const thumbnailRect = thumbnailRef.current.getBoundingClientRect();
            thumbnailWidth = thumbnailRect.right - thumbnailRect.left;
            isDragging = true;
            seekbarWrapperRef.current?.classList.add('dragging');
        };
        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging || !videoRef.current) {
                return;
            }
            const cursorX = e.pageX;
            const seekbarRate = Math.max(0, Math.min((cursorX - seekbarX) / seekbarWidth, 1));
            videoRef.current.currentTime = seekbarRate * length;
            const thumbnailLeft = Math.max(0, Math.min(seekbarRate * seekbarWidth - thumbnailWidth / 2, seekbarWidth - thumbnailWidth));
            setThumbnailLeft(thumbnailLeft);
            updateCurrent();
        };
        const onMouseOut = (e: MouseEvent) => {
            if (!e.target) {
                return;
            }
            const targetEl = e.target as Element;
            const id = targetEl.getAttribute('id');
            if (id !== 'root') {
                return;
            }
            onStopDragging(e);
        };
        const onStopDragging = (e: MouseEvent) => {
            onMouseMove(e);
            setThumbnailDisplay('none');
            isDragging = false;
            seekbarWrapperRef.current?.classList.remove('dragging');
        };
        seekbarWrapperRef.current?.addEventListener('mousedown', onStartDragging);
        document.body.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseout', onMouseOut);
        document.body.addEventListener('mouseup', onStopDragging);
        return () => {
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
            clearInterval(iid);
            seekbarWrapperRef.current?.removeEventListener('mousedown', onStartDragging);
            document.body.removeEventListener('mousemove', onMouseMove);
            document.body.removeEventListener('mouseout', onStopDragging);
            document.body.removeEventListener('mouseup', onStopDragging);
        };
    }, [src]);

    const onClickPause = () => {
        if (videoRef) {
            videoRef.current?.pause();
        }
    };
    const onClickPlay = () => {
        if (videoRef) {
            videoRef.current?.play();
        }
    };
    return (
        <Stack>
            <VideoWrapper>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                <Video src={src} controls ref={videoRef as any} />
            </VideoWrapper>
            <VideoControl>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                <SeekBarWrapper ref={seekbarWrapperRef as any}>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                    <SeekBarOuter ref={seekbarOuterRef as any}>
                        <VideoThumbnail details={details} currentTime={currentTime} display={thumbnailDisplay} left={thumbnailLeft} ref={thumbnailRef} />
                        <SeekBarInner style={{ width: currentPercentage }} />
                        <SeekHandle style={{ left: currentPercentage }} />
                    </SeekBarOuter>
                </SeekBarWrapper>
                <Stack direction="horizontal" className="m-1">
                    {playing ? (
                        <IconWrapper onClick={onClickPause}>
                            <FirstIconToolTip>Pause</FirstIconToolTip>
                            <PauseIcon />
                        </IconWrapper>
                    ) : (
                        <IconWrapper onClick={onClickPlay}>
                            <FirstIconToolTip>Play</FirstIconToolTip>
                            <PlayIcon />
                        </IconWrapper>
                    )}
                    <IconWrapper>
                        <SpeakerIcon />
                    </IconWrapper>
                    <Time>
                        {formatTimeInSecond(currentTime)}/{duration}
                    </Time>
                    {allVideoMode
                        .filter((m) => m !== mode)
                        .map((m, i, arr) => {
                            const [tooltip, Icon] = modeProps[m];
                            const isLast = arr.length === i + 1;
                            return (
                                <IconWrapper onClick={() => setMode(m)} key={`icon-${m}`}>
                                    {isLast ? <LastIconToolTip>{tooltip}</LastIconToolTip> : <IconTooltip>{tooltip}</IconTooltip>}
                                    <Icon />
                                </IconWrapper>
                            );
                        })}
                </Stack>
            </VideoControl>
        </Stack>
    );
};

export default VideoPlayer;
