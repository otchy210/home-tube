import { VideoValues } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useState } from 'react';
import { getSortedVideos } from '../../utils/VideoUtils';
import VideoAlbum from '../organisms/VideoAlbum';
import { useApi } from '../providers/ApiProvider';
import { useSearchQuery } from '../providers/SearchQueryProvider';

const SearchPage: React.FC = () => {
    const [videos, setVideos] = useState<VideoValues[] | undefined>();
    const api = useApi();
    const { searchQuery, setPage } = useSearchQuery();
    const onClickPage = (page: number) => {
        setPage(String(page));
    };
    useEffect(() => {
        api.search(searchQuery).then((videoSet) => {
            setVideos(getSortedVideos(videoSet));
        });
    }, [searchQuery]);
    return <VideoAlbum videos={videos} page={parseInt(searchQuery.page ?? '1')} onClickPage={onClickPage} />;
};

export default SearchPage;
