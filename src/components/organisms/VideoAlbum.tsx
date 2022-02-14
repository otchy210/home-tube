import { VideoValues } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { Alert, Button, ButtonGroup, Col, Row, Stack } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';
import { NameAscIcon, NameDescIcon, TimestampAscIcon, TimestampDescIcon } from '../atoms/VideoAlbumIcons';
import DelayedSpinner from '../molecules/DelayedSpinner';
import VideoPagination from '../molecules/VideoPagination';
import VideoTable from '../molecules/VideoTable';

const SortIconButton = styled(Button).attrs({ className: 'p-1' })``;

const MAX_VIDEO_COUNT = 24;

export const calcPages = (
    videos: VideoValues[],
    page = 1,
    maxVideoCount: number = MAX_VIDEO_COUNT
): { page: number; slicedVideos: VideoValues[]; lastPage: number; visiblePages: number[] } => {
    const firstIndex = (page - 1) * maxVideoCount;
    const slicedVideos = videos.slice(firstIndex, firstIndex + maxVideoCount);
    const lastPage = Math.trunc((videos.length - 1) / maxVideoCount) + 1;
    const firstPagination = Math.max(1, page - 2);
    const lastPagination = Math.min(page + 2, lastPage);
    const visiblePages: number[] = [];
    for (let p = firstPagination; p <= lastPagination; p++) {
        visiblePages.push(p);
    }
    return {
        page,
        slicedVideos,
        lastPage,
        visiblePages,
    };
};

type Props = {
    videos: VideoValues[] | undefined;
    page: number;
    onClickPage: (page: number) => void;
};

const VideoAlbum: React.FC<Props> = ({ videos, page, onClickPage }: Props) => {
    if (!videos) {
        return (
            <Row className="mt-4">
                <Col xs={12}>
                    <DelayedSpinner />
                </Col>
            </Row>
        );
    }
    if (videos.length === 0) {
        return (
            <Row className="mt-4">
                <Col xs={12}>
                    <Alert variant="primary">
                        No videos found. Go to{' '}
                        <LinkContainer to="/">
                            <Alert.Link>home</Alert.Link>
                        </LinkContainer>
                        .
                    </Alert>
                </Col>
            </Row>
        );
    }
    const pagesInfo = calcPages(videos, page);
    const total = videos.length;
    const first = (page - 1) * MAX_VIDEO_COUNT + 1;
    const last = Math.min(first + MAX_VIDEO_COUNT - 1, total);
    return (
        <>
            <Row>
                <Col xs={12} sm={6} className="mt-4 px-1">
                    <Stack direction="horizontal">
                        <div>
                            <ButtonGroup size="sm">
                                <SortIconButton>
                                    <TimestampAscIcon />
                                </SortIconButton>
                                <SortIconButton>
                                    <TimestampDescIcon />
                                </SortIconButton>
                                <SortIconButton>
                                    <NameAscIcon />
                                </SortIconButton>
                                <SortIconButton>
                                    <NameDescIcon />
                                </SortIconButton>
                            </ButtonGroup>
                        </div>
                    </Stack>
                    <Stack direction="horizontal"></Stack>
                </Col>
                <Col xs={12} sm={6} className="mt-4 px-1 text-end">
                    Showing {first} - {last} of {total}
                </Col>
            </Row>
            <VideoTable videos={pagesInfo.slicedVideos} />
            <VideoPagination currentPage={pagesInfo.page} visiblePages={pagesInfo.visiblePages} lastPage={pagesInfo.lastPage} onClick={onClickPage} />
        </>
    );
};

export default VideoAlbum;
