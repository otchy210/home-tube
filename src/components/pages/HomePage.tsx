import { VideoValues } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useState } from 'react';
import { getSortedVideos } from '../../utils/VideoUtils';
import AllTags from '../organisms/AllTags';
import VideoAlbum from '../organisms/VideoAlbum';
import { useAllTags } from '../providers/AllTagsProvider';
import { useApi } from '../providers/ApiProvider';
import { useHomePageQuery } from '../providers/HomePageQueryProvider';

const HomePage: React.FC = () => {
    const [videos, setVideos] = useState<VideoValues[] | undefined>();
    const { homePageQuery, setPage } = useHomePageQuery();
    const api = useApi();
    const { reload: reloadAllTags } = useAllTags();
    useEffect(() => {
        api.search().then((videoSet) => {
            setVideos(getSortedVideos(videoSet));
        });
        reloadAllTags();
    }, []);
    const onClickPage = (page: number) => {
        setPage(String(page));
    };
    return (
        <>
            <VideoAlbum videos={videos} page={homePageQuery.page ? parseInt(homePageQuery.page) : 1} onClickPage={onClickPage} />
            <AllTags />
        </>
    );
};

export default HomePage;
