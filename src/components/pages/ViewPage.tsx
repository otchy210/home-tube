import { Stars, VideoDetails } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import VideoPlayer from '../organisms/VideoPlayer';
import VideoBasicInfo from '../molecules/VideoBasicInfo';
import { useApi } from '../providers/ApiProvider';
import { useToast } from '../providers/ToastsProvider';
import { VideoViewMode } from '../../types';
import VideoDetailedInfo from '../molecules/VideoDetailedInfo';
import { StarsMouseEventHandlers } from '../molecules/StarsIndicator';
import DelayedSpinner from '../molecules/DelayedSpinner';
import { RemoveStars } from '../molecules/VideoProperties';
import { useAllTags } from '../providers/AllTagsProvider';

const ViewPage: React.FC = () => {
    const [mode, setMode] = useState<VideoViewMode>('normal');
    const [details, setDetails] = useState<VideoDetails>();
    const orgStars = useRef<Stars | undefined>();
    const [searchParams] = useSearchParams();
    const [hasError, setHasError] = useState<boolean>(false);
    const { reload: reloadAllTags } = useAllTags();
    const api = useApi();
    const toast = useToast();
    const key = searchParams.get('key');
    if (!key) {
        toast.addError('Video', 'key parameter is required.');
        return null;
    }
    useEffect(() => {
        api.getDetails(key)
            .then((details) => {
                orgStars.current = details.stars;
                setDetails(details);
            })
            .catch((e) => {
                console.error(e);
                toast.addError('Video', `No video found. key: ${key}`);
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
            api.postProperties(key, { stars });
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
            api.postProperties(key, { stars: null });
        },
    };
    const updateTags = (tags: string[]) => {
        const updatedDetails = { ...details, tags };
        setDetails(updatedDetails);
        api.postProperties(key, { tags }).then(() => {
            reloadAllTags();
        });
    };

    return (
        <Row className="pt-4">
            <Col xs={12} lg={mode === 'normal' ? 9 : 12}>
                <VideoPlayer src={api.getVideoUrl(key)} />
                <VideoBasicInfo {...{ details, onStars, removeStars, updateTags }} />
            </Col>
            <Col xs={12} lg={mode === 'normal' ? 3 : 12}>
                <VideoDetailedInfo {...{ details, mode, setMode }} />
            </Col>
        </Row>
    );
};

export default ViewPage;
