import React from 'react';
import { VideoDocument } from '@otchy/home-tube-api/dist/types';
import { Card } from 'react-bootstrap';
import { createSearchParams, Link } from 'react-router-dom';
import VideoCardImg from '../atoms/VideoCardImg';
import StarsIndicator from './StarsIndicator';

type Props = {
    video: VideoDocument;
};

const VideoCard: React.FC<Props> = ({ video }: Props) => {
    const { id, values } = video;
    return (
        <Link to={`/view?${createSearchParams({ id: String(id) })}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className="mt-4">
                <VideoCardImg video={video} />
                <Card.Body>
                    <Card.Title className="fs-6 text-truncate">{values.name}</Card.Title>
                    <Card.Subtitle className="text-muted">
                        <StarsIndicator size={16} stars={values.stars} />
                    </Card.Subtitle>
                    {/* <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text> */}
                </Card.Body>
            </Card>
        </Link>
    );
};

export default VideoCard;
