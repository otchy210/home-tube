import { VideoDocument } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useState } from 'react';
import { getSortedVideos } from '../../utils/sortVideos';
import VideoAlbum from '../organisms/VideoAlbum';
import { useApi } from '../providers/ApiProvider';
import { useSearchQuery } from '../providers/SearchQueryProvier';

const SearchPage: React.FC = () => {
    const [videos, setVideos] = useState<VideoDocument[]>([]);
    const api = useApi();
    const { searchQuery } = useSearchQuery();
    useEffect(() => {
        api.search(searchQuery).then((videoSet) => {
            setVideos(getSortedVideos(videoSet));
        });
    }, [searchQuery]);
    return <VideoAlbum videos={videos} />;
};

export default SearchPage;
