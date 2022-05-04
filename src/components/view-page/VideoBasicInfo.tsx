import { Stars, VideoDetails } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { HorizontalStack } from '../common/layouts';
import VideoPaths from './VideoPaths';
import VideoProperties from './VideoProperties';
import VideoSizeBadges from './VideoSizeBadges';
import VideoTitle from './VideoTitle';

type Props = {
    details: VideoDetails;
    saveStars: (stars: Stars) => void;
    removeStars: () => void;
    updateTags: (tags: string[]) => Promise<void>;
};

const VideoBasicInfo: React.FC<Props> = ({ details, saveStars, removeStars, updateTags }: Props) => {
    const { names, width, height, size } = details;
    return (
        <>
            <HorizontalStack>
                <VideoPaths names={names} />
                <VideoSizeBadges {...{ width, height, size }} />
            </HorizontalStack>
            <VideoTitle details={details} />
            <VideoProperties {...{ details, saveStars, removeStars, updateTags }} />
        </>
    );
};

export default VideoBasicInfo;
