import { VideoValues } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import VideoCard from './VideoCard';

type Props = {
    videos: VideoValues[];
};

const VideoTable: React.FC<Props> = ({ videos }: Props) => {
    return (
        <Row>
            {videos.map((video) => {
                return (
                    <Col xs={12} md={6} lg={4} xxl={3} className="px-1" key={`video-card-${video.key}`}>
                        <VideoCard video={video} />
                    </Col>
                );
            })}
        </Row>
    );
};

export default VideoTable;
