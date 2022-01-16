import { Stars, VideoDetails } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import VideoPlayer from '../molecules/VideoPlayer';
import VideoBasicInfo from '../molecules/VideoBasicInfo';
import { useApi } from '../providers/ApiProvider';
import { useToast } from '../providers/ToastsProvider';
import { VideoViewMode } from '../../types';
import VideoDetailedInfo from '../molecules/VideoDetailedInfo';
import { StarsMouseEventHandlers } from '../molecules/StarsIndicator';
import DelayedSpinner from '../molecules/DelayedSpinner';
import { RemoveStars } from '../molecules/VideoProperties';

const ViewPage: React.FC = () => {
    const [mode, setMode] = useState<VideoViewMode>('default');
    const [details, setDetails] = useState<VideoDetails>();
    const orgStars = useRef<Stars | undefined>();
    const [searchParams] = useSearchParams();
    const [hasError, setHasError] = useState<boolean>(false);
    const api = useApi();
    const toast = useToast();
    const id = searchParams.get('id');
    if (!id) {
        toast.addError('Video', 'id parameter is required.');
        return null;
    }
    useEffect(() => {
        api.getDetails(id)
            .then((details) => {
                orgStars.current = details.stars;
                setDetails(details);
            })
            .catch((e) => {
                console.error(e);
                toast.addError('Video', `No video found. id: ${id}`);
                setHasError(true);
            });
    }, []);
    if (!details) {
        return (
            <Row className="pt-4">
                <Col xs={12}>{!hasError && <DelayedSpinner />}</Col>
            </Row>
        );
    }
    const setStars = (stars: Stars | undefined) => {
        const updatedDetails = { ...details, stars };
        setDetails(updatedDetails);
    };
    const onStars: StarsMouseEventHandlers = {
        click: (stars: Stars) => {
            setStars(stars);
            orgStars.current = stars;
            api.postProperties(id, { stars });
        },
        hover: (stars: Stars) => {
            setStars(stars);
        },
        out: () => {
            setStars(orgStars.current);
        },
    };
    const removeStars: RemoveStars = {
        able: () => {
            return orgStars.current ? true : false;
        },
        do: () => {
            setStars(undefined);
            orgStars.current = undefined;
            api.postProperties(id, { stars: null });
        },
    };

    return (
        <Row className="pt-4">
            <Col xs={12} lg={mode === 'default' ? 9 : 12}>
                <VideoPlayer src={api.getVideoUrl(id)} />
                <VideoBasicInfo details={details} onStars={onStars} removeStars={removeStars} />
            </Col>
            <Col xs={12} lg={mode === 'default' ? 3 : 12}>
                <VideoDetailedInfo {...{ details, mode, setMode }} />
            </Col>
        </Row>
    );
};

export default ViewPage;
