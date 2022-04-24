import { VideoValues } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { createSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import VideoCardImg from '../atoms/VideoCardImg';
import { Card, CardBody, CardSubtitle, CardTitle } from '../common/card';
import StarsIndicator from './StarsIndicator';

const TextTruncateCardTitle = styled(CardTitle)`
    @media (min-width: 768px) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const noDecorationStyle = { textDecoration: 'none', color: 'inherit' };

type Props = {
    video: VideoValues;
};

const VideoCard: React.FC<Props> = ({ video }: Props) => {
    const { key, name, stars } = video;
    const viewUrl = `/view?${createSearchParams({ key })}`;

    return (
        <Card className="mt-4">
            <Link to={viewUrl} style={noDecorationStyle}>
                <VideoCardImg video={video} />
            </Link>
            <CardBody>
                <TextTruncateCardTitle className="fs-6" title={name}>
                    <Link to={viewUrl} style={noDecorationStyle}>
                        {name}
                    </Link>
                </TextTruncateCardTitle>
                <CardSubtitle className="text-muted">
                    <StarsIndicator size={16} stars={stars} />
                </CardSubtitle>
            </CardBody>
        </Card>
    );
};

export default VideoCard;
