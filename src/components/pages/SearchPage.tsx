import { VideoValues } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { getSortedVideos } from '../../utils/VideoUtils';
import VideoAlbum from '../organisms/VideoAlbum';
import { useApi } from '../providers/ApiProvider';
import { SearchQuery, useSearchQuery } from '../providers/SearchQueryProvider';
import { LENGTH_TAGS, POSSIBLE_STARS, SIZE_TAGS } from '@otchy/home-tube-api/dist/const';

const SearchPage: React.FC = () => {
    const [videos, setVideos] = useState<VideoValues[] | undefined>();
    const api = useApi();
    const { searchQuery, setSearchQuery, setPage } = useSearchQuery();
    const [localNames, setLocalNames] = useState<string>(searchQuery?.names?.join(' ') ?? '');
    const namesRef = useRef<HTMLInputElement>(null);
    const starsRef = useRef<HTMLSelectElement>(null);
    const lengthRef = useRef<HTMLSelectElement>(null);
    const sizeRef = useRef<HTMLSelectElement>(null);
    const onClickPage = (page: number) => {
        setPage(String(page));
    };
    const onNamesKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // cannot avoid using deprecated `e.keyCode` due to https://qiita.com/ledsun/items/31e43a97413dd3c8e38e
        if (e.keyCode === 13) {
            e.preventDefault();
            doSearch();
            return;
        }
    };
    const doSearch = () => {
        const names = namesRef.current?.value?.split(/\s/);
        const stars = starsRef.current?.value;
        const size = sizeRef.current?.value;
        const length = lengthRef.current?.value;
        const searchQuery: SearchQuery = {
            names,
            stars,
            size,
            length,
        };
        setSearchQuery(searchQuery);
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
                        <Form.Control
                            value={localNames}
                            ref={namesRef}
                            onChange={(e) => {
                                setLocalNames(e.target?.value);
                            }}
                            onKeyDown={onNamesKeyDown}
                        />
                    </Form.Group>
                    <Form.Group className="mt-2" controlId="stars">
                        <Form.Label>Raiting</Form.Label>
                        <Form.Select ref={starsRef} value={searchQuery.stars} onChange={doSearch}>
                            <option value=""></option>
                            {POSSIBLE_STARS.map((stars) => {
                                const starArray: string[] = [];
                                for (let s = 0; s < stars; s++) {
                                    starArray.push('★');
                                }
                                for (let s = 5; s > stars; s--) {
                                    starArray.push('☆');
                                }
                                return (
                                    <option value={stars} key={`stars-${stars}`}>
                                        {starArray.join('')}
                                    </option>
                                );
                            }).reverse()}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <Form.Group className="mt-2" controlId="length">
                        <Form.Label>Length</Form.Label>
                        <Form.Select ref={lengthRef} value={searchQuery.length} onChange={doSearch}>
                            <option value=""></option>
                            {LENGTH_TAGS.map(({ tag, label }) => {
                                return (
                                    <option value={tag} key={`length-${tag}`}>
                                        {label}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mt-2" controlId="size">
                        <Form.Label>Size</Form.Label>
                        <Form.Select ref={sizeRef} value={searchQuery.size} onChange={doSearch}>
                            <option value=""></option>
                            {SIZE_TAGS.map(({ tag, label }) => {
                                return (
                                    <option value={tag} key={`size-${tag}`}>
                                        {label}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} sm={4} lg={2}>
                    <Form.Group className="mt-2" controlId="tags">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={8} lg={4}>
                    <div className="mt-2">Tag1, Tag2, ...</div>
                </Col>
            </Row>
            <VideoAlbum videos={videos} page={parseInt(searchQuery.page ?? '1')} onClickPage={onClickPage} />
        </>
    );
};

export default SearchPage;
