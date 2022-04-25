import { VideoValues } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useState } from 'react';
import { useSetTitle } from '../../hooks/useSetTitle';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../common/modal';
import AllTags from '../organisms/AllTags';
import VideoAlbum from '../organisms/VideoAlbum';
import { useAllTags } from '../providers/AllTagsProvider';
import { useApi } from '../providers/ApiProvider';
import { useHomePageQuery } from '../providers/HomePageQueryProvider';
import { useI18n } from '../providers/I18nProvider';
import { useToast } from '../providers/ToastsProvider';

const HomePage: React.FC = () => {
    /* DEBUG DEBUG DEBUG */
    const [modalDebug, setModalDebug] = useState<boolean>(false);
    /* DEBUG DEBUG DEBUG */
    const [videos, setVideos] = useState<VideoValues[] | undefined>();
    const [failed, setFailed] = useState<boolean>(false);
    const { homePageQuery, setPage } = useHomePageQuery();
    const api = useApi();
    const toast = useToast();
    const { t } = useI18n();
    const { reload: reloadAllTags } = useAllTags();
    useSetTitle();
    useEffect(() => {
        api.search()
            .then((videoSet) => {
                const videos = Array.from(videoSet).map((doc) => doc.values);
                setVideos(videos);
            })
            .catch(() => {
                toast.addError(t('Home page'), t('Failed to load.'));
                setFailed(true);
            });
        reloadAllTags();
    }, []);
    const onClickPage = (page: number) => {
        setPage(String(page));
    };
    return (
        <>
            {/* DEBUG DEBUG DEBUG */}
            {false && <button onClick={() => setModalDebug(!modalDebug)}>Modal test</button>}
            <Modal show={modalDebug} onHide={() => setModalDebug(false)}>
                <ModalHeader closeButton>Header</ModalHeader>
                <ModalBody>Body</ModalBody>
                <ModalFooter>Footer</ModalFooter>
            </Modal>
            {/* DEBUG DEBUG DEBUG */}
            {!failed && <VideoAlbum videos={videos} page={homePageQuery.page ? parseInt(homePageQuery.page) : 1} onClickPage={onClickPage} />}
            {videos && <AllTags />}
        </>
    );
};

export default HomePage;
