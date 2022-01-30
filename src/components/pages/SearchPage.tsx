import { VideoValues } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { getSortedVideos } from '../../utils/VideoUtils';
import VideoAlbum from '../organisms/VideoAlbum';
import { useApi } from '../providers/ApiProvider';
import { useSearchQuery } from '../providers/SearchQueryProvider';
import Search from '../../images/search.svg';
import styled from 'styled-components';

const SearchIcon = styled(Search)`
    height: 22px;
`;

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
    return (
        <>
            <Row className="mt-2">
                <Col xs={12} sm={6} lg={3}>
                    <Form.Group className="mt-2" controlId="names">
                        <Form.Label>File / directory name</Form.Label>
                        <Form.Control />
                    </Form.Group>
                    <Form.Group className="mt-2" controlId="stars">
                        <Form.Label>Raiting</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={6} lg={2}>
                    <Form.Group className="mt-2" controlId="length">
                        <Form.Label>Length</Form.Label>
                        <Form.Control />
                    </Form.Group>
                    <Form.Group className="mt-2" controlId="size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={4} lg={3}>
                    <Form.Group className="mt-2" controlId="tags">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={8} lg={4}>
                    <div className="mt-2">Tag1, Tag2, ...</div>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col className="text-center" xs={12}>
                    <Button className="text-nowrap">
                        <SearchIcon />
                        <span className="ms-2 align-middle">Search</span>
                    </Button>
                </Col>
            </Row>
            <VideoAlbum videos={videos} page={parseInt(searchQuery.page ?? '1')} onClickPage={onClickPage} />
        </>
    );
};

export default SearchPage;
