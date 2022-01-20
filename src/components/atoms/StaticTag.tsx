import React from 'react';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSearchQuery } from '../providers/SearchQueryProvider';

const Link = styled.a`
    cursor: pointer;
`;

type Props = {
    tag: string;
    count: number;
};

const Tag: React.FC<Props> = ({ tag, count }: Props) => {
    const { setSearchQuery } = useSearchQuery();
    const navigate = useNavigate();
    return (
        <Link
            onClick={() => {
                setSearchQuery({ tags: tag });
                navigate(`/search?tags=${tag}`);
            }}
        >
            <Badge bg="success" className="ms-1 mt-1 fs-6">
                {`${tag} (${count})`}
            </Badge>
        </Link>
    );
};

export default Tag;
