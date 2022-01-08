import { VideoDocument } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import VideoCard from './VideoCard';

type Props = {
    videos: VideoDocument[];
};

const VideoTable: React.FC<Props> = ({ videos }: Props) => {
    return (
        <Row>
            {videos.map((video) => {
                return (
                    <Col xs={12} sm={6} md={4} xxl={3} className="px-1" key={`video-card-${video.id}`}>
                        <VideoCard video={video} />
                    </Col>
                );
            })}
        </Row>
    );
};

export default VideoTable;
