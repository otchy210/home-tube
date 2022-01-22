import { VideoDetails } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { Form } from 'react-bootstrap';
import { VideoViewMode } from '../../types';

type Props = {
    details: VideoDetails;
    mode: VideoViewMode;
    setMode: React.Dispatch<React.SetStateAction<VideoViewMode>>;
};

const VideoDetailedInfo: React.FC<Props> = ({ details, mode, setMode }: Props) => {
    const { vcodec, acodec } = details;
    return (
        <>
            <dl className={`mt-3 mt-lg-${mode === 'theater' ? 3 : 0}`}>
                <dt>video codec</dt>
                <dd>{vcodec}</dd>
                <dt>audio codec</dt>
                <dd>{acodec}</dd>
            </dl>
            <Form.Switch
                label="theater"
                onChange={(e) => {
                    setMode(e.target.checked ? 'theater' : 'normal');
                }}
            />
        </>
    );
};

export default VideoDetailedInfo;
