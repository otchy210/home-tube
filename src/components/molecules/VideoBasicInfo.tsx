import { VideoDetails } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { Stack } from 'react-bootstrap';
import VideoPaths from '../atoms/VideoPaths';
import VideoSizeBadges from './VideoSizeBadges';
import VideoTitle from '../atoms/VideoTitle';
import VideoProperties, { RemoveStars } from './VideoProperties';
import { StarsMouseEventHandlers } from './StarsIndicator';

type Props = {
    details: VideoDetails;
    onStars: StarsMouseEventHandlers;
    removeStars: RemoveStars;
    updateTags: (tags: string[]) => void;
};

const VideoBasicInfo: React.FC<Props> = ({ details, onStars, removeStars, updateTags }: Props) => {
    const { name, names, width, height, size, stars, tags, mp4 } = details;
    return (
        <>
            <Stack direction="horizontal">
                <VideoPaths names={names} />
                <VideoSizeBadges {...{ width, height, size }} />
            </Stack>
            <VideoTitle name={name} />
            <VideoProperties {...{ stars, tags, mp4, onStars, removeStars, updateTags }} />
        </>
    );
};

export default VideoBasicInfo;
