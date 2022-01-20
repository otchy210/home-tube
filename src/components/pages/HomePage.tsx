import { VideoDocument } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useState } from 'react';
import { getSortedVideos } from '../../utils/sortVideos';
import VideoAlbum from '../organisms/VideoAlbum';
import { useApi } from '../providers/ApiProvider';
import { useHomePageQuery } from '../providers/HomePageQueryProvider';

const HomePage: React.FC = () => {
    const [videos, setVideos] = useState<VideoDocument[] | undefined>();
    const { homePageQuery, setPage } = useHomePageQuery();
    const api = useApi();
    useEffect(() => {
        api.search().then((videoSet) => {
            setVideos(getSortedVideos(videoSet));
        });
    }, []);
    const onClickPage = (page: number) => {
        setPage(String(page));
    };
    return <VideoAlbum videos={videos} page={homePageQuery.page ? parseInt(homePageQuery.page) : 1} onClickPage={onClickPage} />;
};

export default HomePage;
