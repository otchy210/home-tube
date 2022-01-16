import React from 'react';
import { Stars } from '@otchy/home-tube-api/dist/types';
import StarsIndicator, { StarsMouseEventHandlers } from './StarsIndicator';
import { Badge, Stack } from 'react-bootstrap';
import Trashcan from '../../images/trashcan.svg';
import styled from 'styled-components';

const TrashcanIcon = styled(Trashcan).attrs({ className: 'ms-1', width: '20', height: '20' })`
    cursor: pointer;
    opacity: 0.5;
    &:hover {
        opacity: 1;
    }
`;

type Props = {
    stars: Stars | undefined;
    tags: string[] | undefined;
    onStars: StarsMouseEventHandlers;
};

const VideoProperties: React.FC<Props> = ({ stars, tags, onStars }: Props) => {
    return (
        <Stack direction="horizontal">
            <StarsIndicator size={30} stars={stars} on={onStars} />
            {stars && <TrashcanIcon />}
            <span className="fs-5 ms-3">
                {tags?.map((tag) => {
                    return (
                        <Badge className="ms-1" key={`tag-${tag}`}>
                            {tag}
                        </Badge>
                    );
                })}
            </span>
        </Stack>
    );
};

export default VideoProperties;
