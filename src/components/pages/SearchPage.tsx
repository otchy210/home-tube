import { LENGTH_TAGS, POSSIBLE_STARS, SIZE_TAGS } from '@otchy/home-tube-api/dist/const';
import { VideoValues } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useSetTitle } from '../../hooks/useSetTitle';
import ClickableTag from '../atoms/ClickableTag';
import VideoAlbum from '../organisms/VideoAlbum';
import { useApi } from '../providers/ApiProvider';
import { useI18n } from '../providers/I18nProvider';
import { SearchQuery, useSearchQuery } from '../providers/SearchQueryProvider';
import { useToast } from '../providers/ToastsProvider';

/*
Translations for type labels of LENGTH_TAGS
t('Moment (<=30s)') t('Short (<=5m)') t('Middle (<=20m)') t('Long (<=1h)') t('Movie (1h+)')
*/

type CandiateTag = {
    tag: string;
    count: number;
};

const SearchPage: React.FC = () => {
    const [videos, setVideos] = useState<VideoValues[] | undefined>();
    const [failed, setFailed] = useState<boolean>(false);
    const api = useApi();
    const toast = useToast();
    const { searchQuery, setSearchQuery, setPage } = useSearchQuery();
    const [localNames, setLocalNames] = useState<string>(searchQuery?.names?.join(' ') ?? '');
    const [candidateTags, setCandidateTags] = useState<CandiateTag[]>([]);
    const { t } = useI18n();
    const namesRef = useRef<HTMLInputElement>(null!);
    const starsRef = useRef<HTMLSelectElement>(null!);
    const lengthRef = useRef<HTMLSelectElement>(null!);
    const sizeRef = useRef<HTMLSelectElement>(null!);
    const tagsRef = useRef<string[]>(searchQuery?.tags ?? []);
    useSetTitle(t('Search'));
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
    const addTag = (tag: string) => {
        tagsRef.current = [...tagsRef.current, tag];
        doSearch();
    };
    const removeTag = (tag: string) => {
        tagsRef.current = tagsRef.current.filter((localTag) => localTag !== tag);
        doSearch();
    };
    const doSearch = () => {
        const names = namesRef.current.value.split(/\s/);
        const stars = starsRef.current.value;
        const length = lengthRef.current.value;
        const size = sizeRef.current.value;
        const tags = tagsRef.current;
        const searchQuery: SearchQuery = {
            names,
            stars,
            size,
            length,
            tags,
        };
        setSearchQuery(searchQuery);
    };

    useEffect(() => {
        api.search(searchQuery)
            .then((videoSet) => {
                const videos = Array.from(videoSet).map((doc) => doc.values);
                setVideos(videos);
                const tagsMap = videos
                    .map((video) => {
                        return video.tags;
                    })
                    .filter((tags) => !!tags)
                    .reduce((map, tags) => {
                        tags?.forEach((tag) => {
                            const current = map.get(tag) ?? 0;
                            map.set(tag, current + 1);
                        });
                        return map;
                    }, new Map<string, number>());
                searchQuery.tags?.forEach((selectedTag) => {
                    tagsMap.delete(selectedTag);
                });
                const candidateTags = Array.from(tagsMap.entries())
                    .sort((left, right) => {
                        const [leftTag, leftCount] = left;
                        const [rightTag, rightCount] = right;
                        const diff = rightCount - leftCount;
                        if (diff !== 0) {
                            return diff;
                        }
                        return leftTag.localeCompare(rightTag);
                    })
                    .map(([tag, count]) => {
                        return { tag, count };
                    });
                setCandidateTags(candidateTags);
            })
            .catch(() => {
                toast.addError(t('Search page'), t('Failed to load.'));
                setFailed(true);
            });
    }, [searchQuery]);
    return (
        <>
            <Row className="mt-2">
                <Col xs={12} sm={6} lg={3}>
                    <Form.Group className="mt-2" controlId="names">
                        <Form.Label>{t('File / folder name')}</Form.Label>
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
                        <Form.Label>{t('Raiting')}</Form.Label>
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
                        <Form.Label>{t('Length')}</Form.Label>
                        <Form.Select ref={lengthRef} value={searchQuery.length} onChange={doSearch}>
                            <option value=""></option>
                            {LENGTH_TAGS.map(({ tag, label }) => {
                                return (
                                    <option value={tag} key={`length-${tag}`}>
                                        {t(label)}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mt-2" controlId="size">
                        <Form.Label>{t('Size')}</Form.Label>
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
                        <Form.Label>{t('Tags')}</Form.Label>
                        {candidateTags && candidateTags.length > 0 ? (
                            <Form.Select
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    addTag(e.target.value);
                                }}
                            >
                                <option value=""></option>
                                {candidateTags.map(({ tag, count }) => {
                                    return (
                                        <option value={tag} key={`tag-${tag}`}>
                                            {`${tag} (${count})`}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        ) : (
                            <div className="text-muted small">{t('No candidates')}</div>
                        )}
                    </Form.Group>
                </Col>
                <Col xs={12} sm={8} lg={4}>
                    <div className="mt-2">
                        {searchQuery.tags?.map((tag) => {
                            return <ClickableTag tag={tag} onClick={removeTag} key={`tag-${tag}`} />;
                        })}
                    </div>
                    {searchQuery.tags && searchQuery.tags.length > 0 && <div className="text-muted small">{t('Click to remove')}</div>}
                </Col>
            </Row>
            {!failed && <VideoAlbum videos={videos} page={parseInt(searchQuery.page ?? '1')} onClickPage={onClickPage} />}
        </>
    );
};

export default SearchPage;
