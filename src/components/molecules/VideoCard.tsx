import React from 'react';
import { VideoDocument } from '@otchy/home-tube-api/dist/types';
import { Card } from 'react-bootstrap';

type Props = {
    video: VideoDocument;
};

const VideoCard: React.FC<Props> = ({ video }: Props) => {
    const { id, values } = video;
    return (
        <Card className="mt-4">
            <Card.Img variant="top" src="https://dummyimage.com/320x240/cccccc/ffffff.png&amp;text=snapshot" />
            <Card.Body>
                <Card.Title>{values.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Video ID: {id}</Card.Subtitle>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default VideoCard;
