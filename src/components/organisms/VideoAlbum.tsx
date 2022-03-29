import { VideoValues } from '@otchy/home-tube-api/dist/types';
import React, { useState } from 'react';
import { Alert, Col, Pagination, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled, { StyledComponent } from 'styled-components';
import ls from '../../utils/LocalStorage';
import { NameAscIcon, NameDescIcon, TimestampAscIcon, TimestampDescIcon } from '../atoms/VideoAlbumIcons';
import DelayedSpinner from '../molecules/DelayedSpinner';
import VideoPagination from '../molecules/VideoPagination';
import VideoTable from '../molecules/VideoTable';
import { useI18n } from '../providers/I18nProvider';

const StyledPaginationItem = styled(Pagination.Item)`
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

type SortKey = 'timestamp-asc' | 'timestamp-desc' | 'name-asc' | 'name-desc';

type SortOption = {
    key: SortKey;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Icon: StyledComponent<any, any>;
    compare: (left: VideoValues, right: VideoValues) => number;
};

const compareNameAsc = (left: VideoValues, right: VideoValues): number => {
    const nameDiff = left.name.localeCompare(right.name);
    if (nameDiff !== 0) {
        return nameDiff;
    }
    return left.path.localeCompare(right.path);
};
const compareNameDesc = (left: VideoValues, right: VideoValues): number => {
    return compareNameAsc(right, left);
};
const compareMtimeAsc = (left: VideoValues, right: VideoValues): number => {
    if (left.mtime && right.mtime) {
        const mtimeDiff = left.mtime - right.mtime;
        if (mtimeDiff !== 0) {
            return mtimeDiff;
        }
    }
    if (!left.mtime && !right.mtime) {
        return compareNameAsc(left, right);
    }
    if (left.mtime) {
        return -1;
    } else {
        return 1;
    }
};
const compareMtimeDesc = (left: VideoValues, right: VideoValues): number => {
    return compareMtimeAsc(right, left);
};

const sortOptions: SortOption[] = [
    { key: 'name-asc', Icon: NameAscIcon, compare: compareNameAsc },
    { key: 'name-desc', Icon: NameDescIcon, compare: compareNameDesc },
    { key: 'timestamp-asc', Icon: TimestampAscIcon, compare: compareMtimeAsc },
    { key: 'timestamp-desc', Icon: TimestampDescIcon, compare: compareMtimeDesc },
];
const sortOptionsMap: Map<SortKey, SortOption> = sortOptions.reduce((map, option) => {
    map.set(option.key, option);
    return map;
}, new Map<SortKey, SortOption>());

const SORT_KEY = 'SORT_KEY';

const useSelectedSortKey = (): [SortKey, (sortKey: SortKey) => void] => {
    const [selectedSortKey, setSelectedSortKey] = useState<SortKey>(ls.getString<SortKey>(SORT_KEY, sortOptions[0].key));
    return [
        selectedSortKey,
        (sortKey: SortKey) => {
            setSelectedSortKey(sortKey);
            ls.setString(SORT_KEY, sortKey);
        },
    ];
};

type Props = {
    videos: VideoValues[] | undefined;
    error: string | undefined;
    page: number;
    onClickPage: (page: number) => void;
};

const VideoAlbum: React.FC<Props> = ({ videos, error, page, onClickPage }: Props) => {
    const [selectedSortKey, setSelectedSortkey] = useSelectedSortKey();
    const { t } = useI18n();
    if (error) {
        return (
            <Row className="mt-4">
                <Col xs={12}>
                    <Alert variant="danger">{error}</Alert>
                </Col>
            </Row>
        );
    }
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
                        {t('No videos found.')}{' '}
                        <LinkContainer to="/">
                            <Alert.Link>{t('Go to home')}</Alert.Link>
                        </LinkContainer>
                    </Alert>
                </Col>
            </Row>
        );
    }
    const sortedVideos = [...videos].sort(sortOptionsMap.get(selectedSortKey)?.compare);
    const pagesInfo = calcPages(sortedVideos, page);
    const total = videos.length;
    const first = (page - 1) * MAX_VIDEO_COUNT + 1;
    const last = Math.min(first + MAX_VIDEO_COUNT - 1, total);
    return (
        <>
            <Row>
                <Col xs={12} sm={6} className="mt-4 px-1">
                    <Pagination>
                        {sortOptions.map((sortOption) => {
                            const { key, Icon } = sortOption;
                            const isSelected = key === selectedSortKey;
                            return (
                                <StyledPaginationItem active={isSelected} onClick={() => !isSelected && setSelectedSortkey(key)} key={`sort-option-${key}`}>
                                    <Icon />
                                </StyledPaginationItem>
                            );
                        })}
                    </Pagination>
                </Col>
                <Col xs={12} sm={6} className="mt-4 px-1 text-end">
                    {t('Showing {{first}} - {{last}} of {{total}}', { first, last, total })}
                </Col>
            </Row>
            <VideoTable videos={pagesInfo.slicedVideos} />
            <VideoPagination currentPage={pagesInfo.page} visiblePages={pagesInfo.visiblePages} lastPage={pagesInfo.lastPage} onClick={onClickPage} />
        </>
    );
};

export default VideoAlbum;
