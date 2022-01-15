import React from 'react';
import { Stars } from '@otchy/home-tube-api/dist/types';
import StarsIndicator from './StarsIndicator';
import { Badge, Stack } from 'react-bootstrap';

type Props = {
    stars: Stars | undefined;
    tags: string[] | undefined;
    onClickStars: (stars: Stars) => void;
};

const VideoProperties: React.FC<Props> = ({ stars, tags, onClickStars }: Props) => {
    return (
        <Stack direction="horizontal">
            <StarsIndicator size={30} stars={stars} onClick={onClickStars} />
            <span className="fs-5">
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
