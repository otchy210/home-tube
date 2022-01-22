import { VideoDetails } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { VideoViewMode } from '../../types';

type Props = {
    details: VideoDetails;
    mode: VideoViewMode;
};

const VideoDetailedInfo: React.FC<Props> = ({ details, mode }: Props) => {
    const { vcodec, acodec } = details;
    return (
        <>
            <dl className={`mt-3 mt-lg-${mode === 'theater' ? 3 : 0}`}>
                <dt>video codec</dt>
                <dd>{vcodec}</dd>
                <dt>audio codec</dt>
                <dd>{acodec}</dd>
            </dl>
        </>
    );
};

export default VideoDetailedInfo;
