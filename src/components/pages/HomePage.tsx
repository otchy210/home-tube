import { VideoDocument } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useState } from 'react';
import { getSortedVideos } from '../../utils/sortVideos';
import VideoAlbum from '../organisms/VideoAlbum';
import { useApi } from '../providers/ApiProvider';

const HomePage: React.FC = () => {
    const [videos, setVideos] = useState<VideoDocument[]>([]);
    const api = useApi();
    useEffect(() => {
        api.search().then((videoSet) => {
            setVideos(getSortedVideos(videoSet));
        });
    }, []);
    return <VideoAlbum videos={videos} />;
};

export default HomePage;
