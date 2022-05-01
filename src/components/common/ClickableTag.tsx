import React from 'react';
import styled from 'styled-components';
import { SuccessBadge } from './badges';

const ClickableBadge = styled(SuccessBadge)`
    cursor: pointer;
`;

type Props = {
    tag: string;
    onClick: (tag: string) => void;
};

const ClickableTag: React.FC<Props> = ({ tag, onClick }: Props) => {
    return (
        <ClickableBadge
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
