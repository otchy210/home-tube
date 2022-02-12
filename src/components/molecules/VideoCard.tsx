import React, { useState } from 'react';
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
    const [loading, setLoading] = useState<boolean>(false);
    const { key, name, stars } = video;
    const viewUrl = `/view?${createSearchParams({ key })}`;
    const onMouseOver = () => {
        setLoading(true);
    };
    const onMouseOut = () => {
        setLoading(false);
    };
    return (
        <Card className="mt-4">
            <Link to={viewUrl} style={noDecorationStyle} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
                <VideoCardImg video={video} loading={loading} opacity={loading ? 0.5 : 1} />
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
                {/* <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text> */}
            </Card.Body>
        </Card>
    );
};

export default VideoCard;
