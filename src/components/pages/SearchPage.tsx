import { VideoDocument } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoAlbum from '../organisms/VideoAlbum';
import { useApi } from '../providers/ApiProvider';

const SearchPage: React.FC = () => {
    const [videos, setVideos] = useState<VideoDocument[]>([]);
    const api = useApi();
    const [searchParams] = useSearchParams();
    const query = ['names', 'length', 'size', 'stars', 'tags'].reduce((params, name) => {
        const value = searchParams.get(name);
        if (!value) {
            return params;
        }
        params[name] = value;
        return params;
    }, {} as { [name: string]: string });
    useEffect(() => {
        api.search(query).then((videoSet) => {
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
    }, [query]);
    return (
        <>
            <VideoAlbum videos={videos} />
        </>
    );
};

export default SearchPage;
