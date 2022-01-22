import React from 'react';
import { Stack } from 'react-bootstrap';
import styled, { css } from 'styled-components';
import Play from '../../images/play.svg';
import Pause from '../../images/pause.svg';
import Speaker from '../../images/speaker.svg';
import Theater from '../../images/theater.svg';
import Normal from '../../images/normal.svg';
import FullScreen from '../../images/full-screen.svg';
import { VideoViewMode } from '../../types';

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
const LastIconToolTip = styled(IconTooltip)`
    transform: translate(-100%, -50px);
    left: 100%;
`;
const Time = styled.div.attrs({ className: 'me-auto p-2 text-white' })``;

const modeProps: Record<VideoViewMode, [string, React.FC]> = {
    normal: ['Normal view', NormalIcon],
    theater: ['Theater mode', TheaterIcon],
    fullScreen: ['Full screen', FullScreenIcon],
};
const allVideoMode: VideoViewMode[] = ['normal', 'theater', 'fullScreen'];

type Props = {
    src: string;
    mode: VideoViewMode;
    setMode: (mode: VideoViewMode) => void;
};

const VideoPlayer: React.FC<Props> = ({ src, mode, setMode }: Props) => {
    return (
        <Stack>
            <VideoWrapper>
                <Video src={src} controls />
            </VideoWrapper>
            <VideoControl>
                <SeekBarWrapper></SeekBarWrapper>
                <Stack direction="horizontal" className="m-1">
                    <IconWrapper>
                        <PlayIcon />
                    </IconWrapper>
                    <IconWrapper>
                        <PauseIcon />
                    </IconWrapper>
                    <IconWrapper>
                        <SpeakerIcon />
                    </IconWrapper>
                    <Time>00:00 / 59:59</Time>
                    {allVideoMode
                        .filter((m) => m !== mode)
                        .map((m, i, arr) => {
                            const [tooltip, Icon] = modeProps[m];
                            const isLast = arr.length === i + 1;
                            return (
                                <IconWrapper onClick={() => setMode(m)}>
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
