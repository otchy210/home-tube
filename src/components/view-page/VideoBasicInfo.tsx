import { Stars, VideoDetails } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { HorizontalStack } from '../common/layouts';
import VideoPaths from './VideoPaths';
import VideoProperties, { RemoveStars } from './VideoProperties';
import VideoSizeBadges from './VideoSizeBadges';
import VideoTitle from './VideoTitle';

type Props = {
    details: VideoDetails;
    onSaveStars: (stars: Stars) => void;
    removeStars: RemoveStars;
    updateTags: (tags: string[]) => Promise<void>;
};

const VideoBasicInfo: React.FC<Props> = ({ details, onSaveStars, removeStars, updateTags }: Props) => {
    const { names, width, height, size } = details;
    return (
        <>
            <HorizontalStack>
                <VideoPaths names={names} />
                <VideoSizeBadges {...{ width, height, size }} />
            </HorizontalStack>
            <VideoTitle details={details} />
            <VideoProperties {...{ details, onSaveStars, removeStars, updateTags }} />
        </>
    );
};

export default VideoBasicInfo;
