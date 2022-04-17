import { VideoDetails } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import VideoPaths from '../atoms/VideoPaths';
import { HorizontalStack } from '../common/layouts';
import { StarsMouseEventHandlers } from './StarsIndicator';
import VideoProperties, { RemoveStars } from './VideoProperties';
import VideoSizeBadges from './VideoSizeBadges';
import VideoTitle from './VideoTitle';

type Props = {
    details: VideoDetails;
    onStars: StarsMouseEventHandlers;
    removeStars: RemoveStars;
    updateTags: (tags: string[]) => Promise<void>;
};

const VideoBasicInfo: React.FC<Props> = ({ details, onStars, removeStars, updateTags }: Props) => {
    const { names, width, height, size } = details;
    return (
        <>
            <HorizontalStack>
                <VideoPaths names={names} />
                <VideoSizeBadges {...{ width, height, size }} />
            </HorizontalStack>
            <VideoTitle details={details} />
            <VideoProperties {...{ details, onStars, removeStars, updateTags }} />
        </>
    );
};

export default VideoBasicInfo;
