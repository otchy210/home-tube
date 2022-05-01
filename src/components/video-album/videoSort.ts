import { VideoValues } from '@otchy/home-tube-api/dist/types';
import { useState } from 'react';
import { StyledComponent } from 'styled-components';
import ls from '../../utils/LocalStorage';
import { NameAscIcon, NameDescIcon, TimestampAscIcon, TimestampDescIcon } from './VideoSortIcons';

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

export const sortOptions: SortOption[] = [
    { key: 'name-asc', Icon: NameAscIcon, compare: compareNameAsc },
    { key: 'name-desc', Icon: NameDescIcon, compare: compareNameDesc },
    { key: 'timestamp-asc', Icon: TimestampAscIcon, compare: compareMtimeAsc },
    { key: 'timestamp-desc', Icon: TimestampDescIcon, compare: compareMtimeDesc },
];
const sortOptionsMap: Map<SortKey, SortOption> = sortOptions.reduce((map, option) => {
    map.set(option.key, option);
    return map;
}, new Map<SortKey, SortOption>());

export const getSortedVideos = (videos: VideoValues[], sortKey: SortKey): VideoValues[] => {
    return [...videos].sort(sortOptionsMap.get(sortKey)?.compare);
};

const SORT_KEY = 'SORT_KEY';

export const useSelectedSortKey = (): [SortKey, (sortKey: SortKey) => void] => {
    const [selectedSortKey, setSelectedSortKey] = useState<SortKey>(ls.getString<SortKey>(SORT_KEY, sortOptions[0].key));
    return [
        selectedSortKey,
        (sortKey: SortKey) => {
            setSelectedSortKey(sortKey);
            ls.setString(SORT_KEY, sortKey);
        },
    ];
};
