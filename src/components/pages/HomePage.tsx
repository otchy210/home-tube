import { VideoValues } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useState } from 'react';
import AllTags from '../organisms/AllTags';
import VideoAlbum from '../organisms/VideoAlbum';
import { useAllTags } from '../providers/AllTagsProvider';
import { useApi } from '../providers/ApiProvider';
import { useHomePageQuery } from '../providers/HomePageQueryProvider';
import { useI18n } from '../providers/I18nProvider';

const HomePage: React.FC = () => {
    const [videos, setVideos] = useState<VideoValues[] | undefined>();
    const { homePageQuery, setPage } = useHomePageQuery();
    const api = useApi();
    const { reload: reloadAllTags } = useAllTags();
    const { t } = useI18n();
    useEffect(() => {
        api.search().then((videoSet) => {
            const videos = Array.from(videoSet).map((doc) => doc.values);
            setVideos(videos);
        });
        reloadAllTags();
    }, []);
    const onClickPage = (page: number) => {
        setPage(String(page));
    };
    return (
        <>
            Translation test: {t('test')}
            <VideoAlbum videos={videos} page={homePageQuery.page ? parseInt(homePageQuery.page) : 1} onClickPage={onClickPage} />
            {videos && <AllTags />}
        </>
    );
};

export default HomePage;
