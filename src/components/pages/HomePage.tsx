import { VideoValues } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getSortedVideos } from '../../utils/sortVideos';
import VideoAlbum from '../organisms/VideoAlbum';
import { useAllTags } from '../providers/AllTagsProvider';
import { useApi } from '../providers/ApiProvider';
import { useHomePageQuery } from '../providers/HomePageQueryProvider';
import StaticTag from '../atoms/StaticTag';

const HomePage: React.FC = () => {
    const [videos, setVideos] = useState<VideoValues[] | undefined>();
    const { homePageQuery, setPage } = useHomePageQuery();
    const api = useApi();
    const { allTags, sortedTags } = useAllTags();
    useEffect(() => {
        api.search().then((videoSet) => {
            setVideos(getSortedVideos(videoSet));
        });
    }, []);
    const onClickPage = (page: number) => {
        setPage(String(page));
    };
    return (
        <>
            <VideoAlbum videos={videos} page={homePageQuery.page ? parseInt(homePageQuery.page) : 1} onClickPage={onClickPage} />
            <Row>
                <Col xs={12}>
                    <h1>All tags</h1>
                    {sortedTags.length === 0 && 'No tags are defined'}
                    {sortedTags.map((tag) => {
                        return <StaticTag tag={tag} count={allTags[tag]} key={`tag-${tag}`} />;
                    })}
                </Col>
            </Row>
        </>
    );
};

export default HomePage;
