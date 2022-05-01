import { VideoDetails } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { VideoViewMode } from '../../types';
import { formatFileSize, formatTime } from '../../utils/StringUtils';
import { useI18n } from '../providers/I18nProvider';

type Props = {
    details: VideoDetails;
    mode: VideoViewMode;
};

const VideoDetailedInfo: React.FC<Props> = ({ details, mode }: Props) => {
    const { t } = useI18n();
    const { vcodec, acodec, fileSize, mtime } = details;
    const isTheater = mode === 'theater';
    return (
        <div className={`mt-3 mt-lg-${isTheater ? 3 : 0}`}>
            <div className={`d-flex ${isTheater ? '' : 'flex-lg-column'}`}>
                <dl className="mb-0">
                    <dt>{t('File size')}</dt>
                    <dd>{fileSize ? formatFileSize(fileSize) : '-'}</dd>
                    <dt>{t('Modified timestamp')}</dt>
                    <dd>{mtime ? formatTime(mtime) : '-'}</dd>
                </dl>
                <dl className={`ms-4 ms-lg-${isTheater ? 4 : 0}`}>
                    <dt>{t('Video codec')}</dt>
                    <dd>{vcodec ?? '-'}</dd>
                    <dt>{t('Audio codec')}</dt>
                    <dd>{acodec ?? '-'}</dd>
                </dl>
            </div>
        </div>
    );
};

export default VideoDetailedInfo;
