import { VideoDocument } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useState } from 'react';
import VideoAlbum from '../organisms/VideoAlbum';
import { useApi } from '../providers/ApiProvider';

const HomePage: React.FC = () => {
    const [videos, setVideos] = useState<VideoDocument[]>([]);
    const api = useApi();
    useEffect(() => {
        api.search().then((videoSet) => {
            const videos = [...videoSet];
            videos.sort((left, right) => {
                const leftName = left.values.name;
                const rightName = right.values.name;
                const nameDiff = leftName.localeCompare(rightName);
                if (nameDiff !== 0) {
                    return nameDiff;
                }
                return left.id - right.id;
            });
            setVideos(videos);
        });
    }, []);
    return (
        <>
            <VideoAlbum videos={videos} />
        </>
    );
};

export default HomePage;
