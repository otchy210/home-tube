import React from 'react';
import { VideoDocument } from '@otchy/home-tube-api/dist/types';
import { Card } from 'react-bootstrap';
import { createSearchParams, Link } from 'react-router-dom';
import { useApi } from '../providers/ApiProvider';

type Props = {
    video: VideoDocument;
};

const VideoCard: React.FC<Props> = ({ video }: Props) => {
    const { id, values } = video;
    const api = useApi();
    return (
        <Link to={`/view?${createSearchParams({ id: String(id) })}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className="mt-4">
                <Card.Img variant="top" src={api.getSnapshotUrl(String(id))} />
                <Card.Body>
                    <Card.Title>{values.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Video ID: {id}</Card.Subtitle>
                    {/* <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text> */}
                </Card.Body>
            </Card>
        </Link>
    );
};

export default VideoCard;
