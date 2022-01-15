import { VideoDetails } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { Stack } from 'react-bootstrap';
import VideoPaths from '../atoms/VideoPaths';
import VideoSizeBadges from './VideoSizeBadges';
import VideoTitle from '../atoms/VideoTitle';
import VideoProperties from './VideoProperties';

type Props = {
    details: VideoDetails;
};

const VideoBasicInfo: React.FC<Props> = ({ details }: Props) => {
    const { name, names, width, height, size, stars, tags } = details;
    return (
        <>
            <Stack direction="horizontal">
                <VideoPaths names={names} />
                <VideoSizeBadges {...{ width, height, size }} />
            </Stack>
            <VideoTitle name={name} />
            <VideoProperties {...{ stars, tags }} />
        </>
    );
};

export default VideoBasicInfo;
