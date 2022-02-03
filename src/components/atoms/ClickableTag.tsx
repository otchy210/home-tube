import React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';

const ClickableBadge = styled(Badge)`
    cursor: pointer;
`;

type Props = {
    tag: string;
    onClick: (tag: string) => void;
};

const ClickableTag: React.FC<Props> = ({ tag, onClick }: Props) => {
    return (
        <ClickableBadge
            bg="success"
            className="me-1 mt-1 fs-6"
            onClick={() => {
                onClick(tag);
            }}
        >
            {tag}
        </ClickableBadge>
    );
};

export default ClickableTag;
