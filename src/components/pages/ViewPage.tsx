import { VideoDetails } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import VideoPlayer from '../molecules/VideoPlayer';
import VideoBasicInfo from '../molecules/VideoBasicInfo';
import { useApi } from '../providers/ApiProvider';
import { useToast } from '../providers/ToastsProvider';
import { VideoViewMode } from '../../types';
import VideoDetailedInfo from '../molecules/VideoDetailedInfo';

const ViewPage: React.FC = () => {
    const [mode, setMode] = useState<VideoViewMode>('default');
    const [details, setDetails] = useState<VideoDetails>();
    const [searchParams] = useSearchParams();
    const api = useApi();
    const toast = useToast();
    const id = searchParams.get('id');
    if (!id) {
        toast.addError('Video', 'id parameter is required.');
        return null;
    }
    useEffect(() => {
        api.getDetails(id)
            .then(setDetails)
            .catch((e) => {
                console.error(e);
                toast.addError('Video', `No video found. id: ${id}`);
            });
    }, []);
    if (!details) {
        return null;
    }
    return (
        <Row className="pt-4">
            <Col xs={12} lg={mode === 'default' ? 9 : 12}>
                <VideoPlayer src={api.getVideoUrl(id)} />
                <VideoBasicInfo details={details} />
            </Col>
            <Col xs={12} lg={mode === 'default' ? 3 : 12}>
                <VideoDetailedInfo {...{ details, mode, setMode }} />
            </Col>
        </Row>
    );
};

export default ViewPage;
