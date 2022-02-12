import React from 'react';
import { VideoValues } from '@otchy/home-tube-api/dist/types';
import { Card } from 'react-bootstrap';
import { createSearchParams, Link } from 'react-router-dom';
import VideoCardImg from '../atoms/VideoCardImg';
import StarsIndicator from './StarsIndicator';

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
            <Card.Body>
                <Card.Title className="fs-6 text-truncate" title={name}>
                    <Link to={viewUrl} style={noDecorationStyle}>
                        {name}
                    </Link>
                </Card.Title>
                <Card.Subtitle className="text-muted">
                    <StarsIndicator size={16} stars={stars} />
                </Card.Subtitle>
            </Card.Body>
        </Card>
    );
};

export default VideoCard;
