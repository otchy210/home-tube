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
import { formatTimeInSecond } from '../../utils/TimeUtils';

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

const SeekBarWrapper = styled.div.attrs({ className: 'mt-auto' })`
    height: 32px;
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
    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
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
`;

const modeProps: Record<VideoViewMode, [string, React.FC]> = {
    normal: ['Normal view', NormalIcon],
    theater: ['Theater mode', TheaterIcon],
    fullScreen: ['Full screen', FullScreenIcon],
};
const allVideoMode: VideoViewMode[] = ['normal', 'theater', 'fullScreen'];

type Props = {
    src: string;
    length: number;
    mode: VideoViewMode;
    setMode: (mode: VideoViewMode) => void;
};

const VideoPlayer: React.FC<Props> = ({ src, length, mode, setMode }: Props) => {
    const [playing, setPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<string>('00:00');
    const videoRef = useRef<HTMLVideoElement>();
    const duration = formatTimeInSecond(length);
    useEffect(() => {
        const video = videoRef.current;
        if (!video) {
            return;
        }
        let iid: number;
        const updateCurrentTime = () => {
            const currentTime = formatTimeInSecond(videoRef.current?.currentTime);
            setCurrentTime(currentTime);
        };
        updateCurrentTime();
        const onPlay = () => {
            setPlaying(true);
            iid = setInterval(updateCurrentTime, 10) as unknown as number;
        };
        const onPause = () => {
            setPlaying(false);
            clearInterval(iid);
        };
        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);
        return () => {
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
            clearInterval(iid);
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
                <SeekBarWrapper></SeekBarWrapper>
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
                        {currentTime}/{duration}
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
