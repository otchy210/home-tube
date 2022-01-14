import { VideoDocument } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import VideoPagination from '../molecules/VideoPagination';
import VideoTable from '../molecules/VideoTable';

const MAX_VIDEO_COUNT = 24;

export const calcPages = (
    videos: VideoDocument[],
    page = 1,
    maxVideoCount: number = MAX_VIDEO_COUNT
): { page: number; slicedVideos: VideoDocument[]; lastPage: number; visiblePages: number[] } => {
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
    videos: VideoDocument[];
    page?: number;
};

const VideoAlbum: React.FC<Props> = ({ videos, page }: Props) => {
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
    const onClickPage = (page: number): void => {
        console.log(`page ${page} clicked`);
    };
    return (
        <>
            <VideoTable videos={pagesInfo.slicedVideos} />
            <VideoPagination currentPage={pagesInfo.page} visiblePages={pagesInfo.visiblePages} lastPage={pagesInfo.lastPage} onClick={onClickPage} />
        </>
    );
};

export default VideoAlbum;
