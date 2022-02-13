import { VideoDetails } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { VideoViewMode } from '../../types';
import { formatFileSize, formatTime } from '../../utils/StringUtils';

type Props = {
    details: VideoDetails;
    mode: VideoViewMode;
};

const VideoDetailedInfo: React.FC<Props> = ({ details, mode }: Props) => {
    const { vcodec, acodec, fileSize, mtime } = details;
    const isTheater = mode === 'theater';
    return (
        <div className={`mt-3 mt-lg-${isTheater ? 3 : 0}`}>
            <div className={`d-flex ${isTheater ? '' : 'flex-lg-column'}`}>
                <dl className="mb-0">
                    <dt>file size</dt>
                    <dd>{fileSize ? formatFileSize(fileSize) : '-'}</dd>
                    <dt>modified timestamp</dt>
                    <dd>{mtime ? formatTime(mtime) : '-'}</dd>
                </dl>
                <dl className={`ms-4 ms-lg-${isTheater ? 4 : 0}`}>
                    <dt>video codec</dt>
                    <dd>{vcodec ?? '-'}</dd>
                    <dt>audio codec</dt>
                    <dd>{acodec ?? '-'}</dd>
                </dl>
            </div>
        </div>
    );
};

export default VideoDetailedInfo;
