import { VideoDocument } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import VideoAlbum from '../organisms/VideoAlbum';

const HomePage: React.FC = () => {
    const videos = new Array(24).fill('').map((_, index) => {
        return {
            id: index + 1,
            values: {
                name: `Video-${index + 1}`,
            },
        };
    }) as VideoDocument[];
    return (
        <>
            <VideoAlbum videos={videos} />
        </>
    );
};

export default HomePage;
