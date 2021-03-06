import { Stars, VideoDetails } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSetTitle } from '../../hooks/useSetTitle';
import { VideoViewMode } from '../../types';
import DelayedSpinner from '../common/DelayedSpinner';
import { FullWidthCol, Row, Col } from '../common/layouts';
import { useAllTags } from '../providers/AllTagsProvider';
import { useApi } from '../providers/ApiProvider';
import { useI18n } from '../providers/I18nProvider';
import { useToast } from '../providers/ToastsProvider';
import VideoPlayer from '../video-player/VideoPlayer';
import VideoBasicInfo from '../view-page/VideoBasicInfo';
import VideoDetailedInfo from '../view-page/VideoDetailedInfo';

const VideoPlayerWrapper = styled.div`
    &.theater {
        position: absolute;
        display: flex;
        left: 0;
        background-color: #000;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
`;

const VideoPlayerSpacer = styled.div`
    display: none;
    &.theater {
        display: block;
    }
`;

const ViewPage: React.FC = () => {
    const [mode, setMode] = useState<VideoViewMode>('normal');
    const [details, setDetails] = useState<VideoDetails>();
    const orgStars = useRef<Stars | undefined>();
    const [searchParams] = useSearchParams();
    const [hasError, setHasError] = useState<boolean>(false);
    const { reload: reloadAllTags } = useAllTags();
    const viewPageRootRef = useRef<HTMLDivElement>(null!);
    const videoPlayerWrapperRef = useRef<HTMLDivElement>(null!);
    const videoPlayerSpacerRef = useRef<HTMLDivElement>(null!);
    const { t } = useI18n();
    const api = useApi();
    const toast = useToast();
    const key = searchParams.get('key');
    useSetTitle(() => {
        if (!key || hasError) {
            return t('Error');
        }
        if (!details) {
            return t('Video loading');
        }
        return details.name;
    }, [key, hasError, details]);

    useEffect(() => {
        if (!key) {
            toast.addError(t('Video page'), t('key parameter is required.'));
        }
    }, [key]);

    if (!key) {
        return null;
    }

    const setStars = (stars: Stars | undefined) => {
        if (!details) {
            return;
        }
        const updatedDetails = { ...details, stars };
        setDetails(updatedDetails);
    };
    const saveStars = (stars: Stars) => {
        setStars(stars);
        orgStars.current = stars;
        api.postProperties(key, { stars });
    };
    const removeStars = () => {
        setStars(undefined);
        orgStars.current = undefined;
        api.postProperties(key, { stars: null });
    };
    const updateTags = (tags: string[]) => {
        if (!details) {
            return Promise.resolve();
        }
        const updatedDetails = { ...details, tags };
        setDetails(updatedDetails);
        return api.postProperties(key, { tags }).then(() => {
            reloadAllTags();
        });
    };

    const calcVideoPlayerHeight = () => {
        const wrapper = videoPlayerWrapperRef.current;
        const video = wrapper.querySelector('video');
        if (!video) {
            return;
        }
        const page = viewPageRootRef.current;
        const spacer = videoPlayerSpacerRef.current;
        const [videoWidth, videoHeight] = [video.videoWidth, video.videoHeight];
        let theaterViewHeight;
        if (wrapper.classList.contains('theater')) {
            const maxWidth = window.innerWidth;
            const contentHeight = maxWidth * (videoHeight / videoWidth);
            const spaceMinHeight = spacer.getBoundingClientRect().width * (videoHeight / videoWidth);
            const minHeight = Math.min(spaceMinHeight, contentHeight);
            const pageTop = page.getBoundingClientRect().top;
            const buffer = 70;
            const pageMaxHeight = window.innerHeight - pageTop - buffer;
            const maxHeight = Math.min(pageMaxHeight, contentHeight);
            if (maxHeight < spaceMinHeight) {
                theaterViewHeight = `${spaceMinHeight}px`;
            } else if (maxHeight < minHeight) {
                theaterViewHeight = `${maxHeight}px`;
            } else {
                theaterViewHeight = `${Math.max(minHeight, maxHeight)}px`;
            }
        } else {
            theaterViewHeight = 'auto';
        }
        wrapper.style.height = theaterViewHeight;
        spacer.style.height = theaterViewHeight;
    };
    setTimeout(calcVideoPlayerHeight, 10);

    useEffect(() => {
        api.getDetails(key)
            .then((details) => {
                orgStars.current = details.stars;
                setDetails(details);
                if (!details.length) {
                    return;
                }
                // preload thumbnail images
                const maxMin = Math.trunc(details.length / 60);
                for (let min = 0; min <= maxMin; min++) {
                    const src = api.getThumbnailsUrl(key, String(min));
                    const image = new Image();
                    image.setAttribute('src', src);
                }
            })
            .catch(() => {
                toast.addError(t('Video page'), [`${t('No videos found.')}`, `key: ${key}`]);
                setHasError(true);
            });
        reloadAllTags();
        window.addEventListener('resize', calcVideoPlayerHeight);
        return () => {
            window.removeEventListener('resize', calcVideoPlayerHeight);
        };
    }, []);

    if (!details) {
        return (
            <Row className="pt-4">
                <FullWidthCol>{!hasError && <DelayedSpinner />}</FullWidthCol>
            </Row>
        );
    }

    return (
        <Row className={mode === 'theater' ? '' : 'pt-4'} ref={viewPageRootRef}>
            <Col width={[12, 12, 12, mode === 'theater' ? 12 : 9]}>
                <VideoPlayerWrapper className={mode} ref={videoPlayerWrapperRef}>
                    <VideoPlayer details={details} {...{ mode, setMode }} />
                </VideoPlayerWrapper>
                <VideoPlayerSpacer className={mode} ref={videoPlayerSpacerRef} />
                <VideoBasicInfo {...{ details, saveStars, removeStars, updateTags }} />
            </Col>
            <Col width={[12, 12, 12, mode === 'theater' ? 12 : 3]}>
                <VideoDetailedInfo {...{ details, mode, setMode }} />
            </Col>
        </Row>
    );
};

export default ViewPage;
