import { VideoDocument } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSortedVideos } from '../../utils/sortVideos';
import VideoAlbum from '../organisms/VideoAlbum';
import { useApi } from '../providers/ApiProvider';

const getPageFromUrl = (): number => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');
    return page ? parseInt(page) : 1;
};

const HomePage: React.FC = () => {
    const [videos, setVideos] = useState<VideoDocument[] | undefined>();
    const [page, setPage] = useState<number>(getPageFromUrl());
    const api = useApi();
    const navigate = useNavigate();
    useEffect(() => {
        api.search().then((videoSet) => {
            setVideos(getSortedVideos(videoSet));
        });
    }, []);
    const onClickPage = (page: number) => {
        setPage(page);
        if (page === 1) {
            navigate('');
        } else {
            navigate(`/?page=${page}`);
        }
    };
    return <VideoAlbum videos={videos} page={page} onClickPage={onClickPage} />;
};

export default HomePage;
