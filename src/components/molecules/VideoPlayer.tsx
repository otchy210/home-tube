import React from 'react';
import styled from 'styled-components';

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

type Props = {
    src: string;
};

const VideoPlayer: React.FC<Props> = ({ src }: Props) => {
    return (
        <VideoWrapper>
            <Video src={src} controls />
        </VideoWrapper>
    );
};

export default VideoPlayer;
