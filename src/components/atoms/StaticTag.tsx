import React from 'react';
import { createSearchParams } from 'react-router-dom';
import { partiallyPreventDefault } from '../../utils/EventUtils';
import { SuccessBadge } from '../common/badges';
import { useSearchQuery } from '../providers/SearchQueryProvider';

type Props = {
    tag: string;
    count: number;
};

const StaticTag: React.FC<Props> = ({ tag, count }: Props) => {
    const { setSearchQuery } = useSearchQuery();
    const params = createSearchParams();
    params.append('tags', JSON.stringify([tag]));
    const url = `/search?${params.toString()}`;
    return (
        <a
            href={url}
            onClick={partiallyPreventDefault(() => {
                setSearchQuery({ tags: [tag] });
            })}
        >
            <SuccessBadge className="ms-1 mt-1 fs-6">{`${tag} (${count})`}</SuccessBadge>
        </a>
    );
};

export default StaticTag;
