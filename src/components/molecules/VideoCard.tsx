import React from 'react';
import { VideoValues } from '@otchy/home-tube-api/dist/types';
import { Card } from 'react-bootstrap';
import { createSearchParams, Link } from 'react-router-dom';
import VideoCardImg from '../atoms/VideoCardImg';
import StarsIndicator from './StarsIndicator';

type Props = {
    video: VideoValues;
};

const VideoCard: React.FC<Props> = ({ video }: Props) => {
    const { key, name, stars } = video;
    return (
        <Link to={`/view?${createSearchParams({ key })}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className="mt-4">
                <VideoCardImg video={video} />
                <Card.Body>
                    <Card.Title className="fs-6 text-truncate">{name}</Card.Title>
                    <Card.Subtitle className="text-muted">
                        <StarsIndicator size={16} stars={stars} />
                    </Card.Subtitle>
                    {/* <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text> */}
                </Card.Body>
            </Card>
        </Link>
    );
};

export default VideoCard;
