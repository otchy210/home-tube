import React from 'react';
import { Stack } from 'react-bootstrap';
import styled, { css } from 'styled-components';
import Play from '../../images/play.svg';
import Pause from '../../images/pause.svg';
import Speaker from '../../images/speaker.svg';
import Theater from '../../images/theater.svg';
import Normal from '../../images/normal.svg';
import Fullscreen from '../../images/fullscreen.svg';

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
const FullscreenIcon = styled(Fullscreen).attrs(iconSttrs)`
    ${iconStyle};
`;
const IconWrapper = styled.div.attrs({ className: 'm-0 p-1 p-sm-2 rounded-circle', role: 'button' })`
    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }
`;
const Time = styled.div.attrs({ className: 'me-auto p-2 text-white' })``;

type Props = {
    src: string;
};

const VideoPlayer: React.FC<Props> = ({ src }: Props) => {
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
                    <IconWrapper>
                        <TheaterIcon />
                    </IconWrapper>
                    <IconWrapper>
                        <NormalIcon />
                    </IconWrapper>
                    <IconWrapper>
                        <FullscreenIcon />
                    </IconWrapper>
                </Stack>
            </VideoControl>
        </Stack>
    );
};

export default VideoPlayer;
