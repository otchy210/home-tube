import React from 'react';
import { Badge } from 'react-bootstrap';
import { createSearchParams } from 'react-router-dom';
import { partiallyPreventDefault } from '../../utils/EventUtils';
import { useSearchQuery } from '../providers/SearchQueryProvider';

type Props = {
    tag: string;
    count: number;
};

const Tag: React.FC<Props> = ({ tag, count }: Props) => {
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
            <Badge bg="success" className="ms-1 mt-1 fs-6">
                {`${tag} (${count})`}
            </Badge>
        </a>
    );
};

export default Tag;
