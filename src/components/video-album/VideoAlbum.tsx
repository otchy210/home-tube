import { VideoValues } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';
import { AlertLink, PrimaryAlert } from '../common/alert';
import DelayedSpinner from '../common/DelayedSpinner';
import { FullWidthCol, Row, Col } from '../common/layouts';
import { PageItem, Pagination } from '../common/pagination';
import { useI18n } from '../providers/I18nProvider';
import VideoPagination from '../video-album/VideoPagination';
import VideoTable from '../video-album/VideoTable';
import { getSortedVideos, sortOptions, useSelectedSortKey } from './videoSort';

const StyledPageItem = styled(PageItem)`
    & .page-link {
        padding: 0.25rem;
    }
    & path {
        fill: var(--bs-primary);
    }
    &.active path {
        fill: #fff;
    }
`;

const MAX_VIDEO_COUNT = 24;

export const calcPages = (
    videos: VideoValues[],
    page = 1,
    maxVideoCount: number = MAX_VIDEO_COUNT
): { page: number; slicedVideos: VideoValues[]; lastPage: number; visiblePages: number[] } => {
    const firstIndex = (page - 1) * maxVideoCount;
    const slicedVideos = videos.slice(firstIndex, firstIndex + maxVideoCount);
    const lastPage = Math.trunc((videos.length - 1) / maxVideoCount) + 1;
    const firstPagination = Math.max(1, page - 3);
    const lastPagination = Math.min(page + 3, lastPage);
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
    const [selectedSortKey, setSelectedSortkey] = useSelectedSortKey();
    const { t } = useI18n();
    if (!videos) {
        return (
            <Row className="mt-4">
                <FullWidthCol>
                    <DelayedSpinner />
                </FullWidthCol>
            </Row>
        );
    }
    if (videos.length === 0) {
        return (
            <Row className="mt-4">
                <FullWidthCol>
                    <PrimaryAlert>
                        {t('No videos found.')}{' '}
                        <LinkContainer to="/">
                            <AlertLink>{t('Go to home')}</AlertLink>
                        </LinkContainer>
                    </PrimaryAlert>
                </FullWidthCol>
            </Row>
        );
    }
    const sortedVideos = getSortedVideos(videos, selectedSortKey);
    const pagesInfo = calcPages(sortedVideos, page);
    const total = videos.length;
    const first = (page - 1) * MAX_VIDEO_COUNT + 1;
    const last = Math.min(first + MAX_VIDEO_COUNT - 1, total);
    return (
        <>
            <Row className="mt-4">
                <Col width={[12, 12, 6]} className="px-1">
                    <Pagination className="m-0">
                        {sortOptions.map((sortOption) => {
                            const { key, Icon } = sortOption;
                            const isSelected = key === selectedSortKey;
                            return (
                                <StyledPageItem active={isSelected} onClick={() => !isSelected && setSelectedSortkey(key)} key={`sort-option-${key}`}>
                                    <Icon />
                                </StyledPageItem>
                            );
                        })}
                    </Pagination>
                </Col>
                <Col width={[12, 12, 6]} className="px-1 text-end">
                    {t('Showing {{first}} - {{last}} of {{total}}', { first, last, total })}
                </Col>
            </Row>
            <VideoTable videos={pagesInfo.slicedVideos} />
            <VideoPagination currentPage={pagesInfo.page} visiblePages={pagesInfo.visiblePages} lastPage={pagesInfo.lastPage} onClick={onClickPage} />
        </>
    );
};

export default VideoAlbum;
