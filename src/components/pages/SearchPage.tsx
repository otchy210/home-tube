import { VideoDocument } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoAlbum from '../organisms/VideoAlbum';

const SearchPage: React.FC = () => {
    const [params] = useSearchParams();
    console.log(params.get('names'));
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

export default SearchPage;
