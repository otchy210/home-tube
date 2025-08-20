import { VideoConverterStatus, VideoDetails } from '@otchy/home-tube-api/dist/types';
import Tree from 'rc-tree';
import React, { useState } from 'react';
import styled from 'styled-components';
import 'rc-tree/assets/index.css';
import { VideoViewMode } from '../../types';
import { formatFileSize, formatTime } from '../../utils/StringUtils';
import { Badge, BadgeVariant } from '../common/badges';
import { PrimaryButton, SecondaryButton } from '../common/buttons';
import Confirm from '../common/Confirm';
import { Col, Container, Row } from '../common/layouts';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../common/modal';
import { useApi } from '../providers/ApiProvider';
import { useI18n } from '../providers/I18nProvider';

const DataList = styled.dl.attrs({ className: 'mb-0' })``;

type Props = {
    details: VideoDetails;
    mode: VideoViewMode;
};

const VideoDetailedInfo: React.FC<Props> = ({ details, mode }: Props) => {
    const { key, vcodec, acodec, fileSize, mtime, mp4: givenMp4 } = details;
    const [mp4, setMp4] = useState<VideoConverterStatus>(givenMp4 ?? 'unavailable');
    const [showMp4Confirm, setShowMp4Confirm] = useState<boolean>(false);
    const [showMp4RemovalConfirm, setShowMp4RemovalConfirm] = useState<boolean>(false);
    const [showMoveFileModal, setShowMoveFileModal] = useState<boolean>(false);
    const [selectedFolder, setSelectedFolder] = useState<string>('');
    const api = useApi();
    const { t } = useI18n();

    // Dummy folder data with multiple root folders and multi-layered sub folders
    const folderData = [
        {
            key: 'media',
            title: 'Media',
            children: [
                {
                    key: 'media/videos',
                    title: 'Videos',
                    children: [
                        { key: 'media/videos/movies', title: 'Movies' },
                        { key: 'media/videos/tv-shows', title: 'TV Shows' },
                        { key: 'media/videos/documentaries', title: 'Documentaries' },
                        { key: 'media/videos/home-videos', title: 'Home Videos' },
                    ],
                },
                {
                    key: 'media/music',
                    title: 'Music',
                    children: [
                        { key: 'media/music/rock', title: 'Rock' },
                        { key: 'media/music/jazz', title: 'Jazz' },
                        { key: 'media/music/classical', title: 'Classical' },
                        { key: 'media/music/pop', title: 'Pop' },
                    ],
                },
                {
                    key: 'media/photos',
                    title: 'Photos',
                    children: [
                        { key: 'media/photos/family', title: 'Family' },
                        { key: 'media/photos/work', title: 'Work' },
                        { key: 'media/photos/vacations', title: 'Vacations' },
                        { key: 'media/photos/events', title: 'Events' },
                    ],
                },
            ],
        },
        {
            key: 'documents',
            title: 'Documents',
            children: [
                {
                    key: 'documents/work',
                    title: 'Work',
                    children: [
                        { key: 'documents/work/reports', title: 'Reports' },
                        { key: 'documents/work/presentations', title: 'Presentations' },
                        { key: 'documents/work/meetings', title: 'Meetings' },
                        { key: 'documents/work/projects', title: 'Projects' },
                    ],
                },
                {
                    key: 'documents/personal',
                    title: 'Personal',
                    children: [
                        { key: 'documents/personal/finance', title: 'Finance' },
                        { key: 'documents/personal/health', title: 'Health' },
                        { key: 'documents/personal/education', title: 'Education' },
                        { key: 'documents/personal/legal', title: 'Legal' },
                    ],
                },
                {
                    key: 'documents/archive',
                    title: 'Archive',
                    children: [
                        { key: 'documents/archive/old-work', title: 'Old Work' },
                        { key: 'documents/archive/backups', title: 'Backups' },
                        { key: 'documents/archive/temp', title: 'Temporary' },
                    ],
                },
            ],
        },
        {
            key: 'downloads',
            title: 'Downloads',
            children: [
                {
                    key: 'downloads/software',
                    title: 'Software',
                    children: [
                        { key: 'downloads/software/apps', title: 'Applications' },
                        { key: 'downloads/software/drivers', title: 'Drivers' },
                        { key: 'downloads/software/updates', title: 'Updates' },
                    ],
                },
                {
                    key: 'downloads/torrents',
                    title: 'Torrents',
                    children: [
                        { key: 'downloads/torrents/completed', title: 'Completed' },
                        { key: 'downloads/torrents/in-progress', title: 'In Progress' },
                        { key: 'downloads/torrents/seeds', title: 'Seeds' },
                    ],
                },
            ],
        },
        {
            key: 'backup',
            title: 'Backup',
            children: [
                {
                    key: 'backup/system',
                    title: 'System',
                    children: [
                        { key: 'backup/system/daily', title: 'Daily' },
                        { key: 'backup/system/weekly', title: 'Weekly' },
                        { key: 'backup/system/monthly', title: 'Monthly' },
                    ],
                },
                {
                    key: 'backup/data',
                    title: 'Data',
                    children: [
                        { key: 'backup/data/important', title: 'Important' },
                        { key: 'backup/data/regular', title: 'Regular' },
                        { key: 'backup/data/archive', title: 'Archive' },
                    ],
                },
            ],
        },
    ];

    const [mp4Variant, mp4Message, mp4ConvertButton] = (() => {
        switch (mp4) {
            case 'available':
                return [
                    'primary' as BadgeVariant,
                    t('Being ready to play instead of original.'),
                    <PrimaryButton size="sm" onClick={() => setShowMp4RemovalConfirm(true)}>
                        {t('Remove MP4')}
                    </PrimaryButton>,
                ];
            case 'queued':
                return ['warning' as BadgeVariant, t('Waiting for converting to recommended MP4 format.'), null];
            case 'processing':
                return ['warning' as BadgeVariant, t('Processing to convert this video to recommended MP4 format.'), null];
            default:
                return [
                    'secondary' as BadgeVariant,
                    t('Do you want to convert this video to recommended MP4 format?'),
                    <PrimaryButton size="sm" onClick={() => setShowMp4Confirm(true)}>
                        {t('Try MP4')}
                    </PrimaryButton>,
                ];
        }
    })();
    const convertToMp4 = () => {
        api.postConvert(key, 'mp4').then((result) => {
            setMp4(result.status);
        });
    };
    const removeMp4 = () => {
        api.deleteConvert(key, 'mp4').then((result) => {
            setMp4(result.status);
        });
    };

    const isTheater = mode === 'theater';
    return (
        <>
            <Modal show={showMoveFileModal} onHide={() => setShowMoveFileModal(false)} size="lg">
                <ModalHeader closeButton>{t('Move file')}</ModalHeader>
                <ModalBody>
                    <p>{t('Select destination folder:')}</p>
                    <div className="border rounded p-2" style={{ maxHeight: '300px', overflow: 'auto' }}>
                        <Tree
                            treeData={folderData}
                            onSelect={(selectedKeys) => {
                                if (selectedKeys.length > 0) {
                                    setSelectedFolder(selectedKeys[0] as string);
                                }
                            }}
                            showLine
                            showIcon
                            defaultExpandAll
                            icon={({ expanded }) => <span className="fs-6">{expanded ? '📂' : '📁'}</span>}
                        />
                    </div>
                    <div className="mt-3 p-2 bg-light rounded">
                        <strong>{t('Selected folder:')}</strong> {selectedFolder}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <SecondaryButton onClick={() => setShowMoveFileModal(false)}>{t('Cancel')}</SecondaryButton>
                    <PrimaryButton disabled={!selectedFolder}>{t('Move file')}</PrimaryButton>
                </ModalFooter>
            </Modal>
            <Confirm
                show={showMp4Confirm}
                setShow={setShowMp4Confirm}
                title={t('Confirmation')}
                submit={{ variant: 'primary', label: t('Convert to MP4'), onClick: convertToMp4 }}
            >
                <p>{t("You're about to start converting this video to MP4. Make sure followings.")}</p>
                <ul>
                    <li>
                        {t(
                            "The process will take possibly very long time depending on the performance of the machine you're using. It typically takes more time than the video length."
                        )}
                    </li>
                    <li>{t('The original file will remain as is. The process will make a MP4 format copy.')}</li>
                    <li>{t("You'll be able to check the video conversion status in this page and config page once the process gets started.")}</li>
                    <li>{t("You'll be able to revert it even after the video conversion ends since the original will remain as is.")}</li>
                </ul>
                <p className="mb-0">{t('Are you sure to start converting?')}</p>
            </Confirm>
            <Confirm
                show={showMp4RemovalConfirm}
                setShow={setShowMp4RemovalConfirm}
                title={t('Confirmation')}
                submit={{ variant: 'danger', label: t('Remove MP4'), onClick: removeMp4 }}
            >
                <p>{t("You're about to remove the converted MP4. Make sure followings.")}</p>
                <ul>
                    <li>{t('Once you remove the MP4 file, you will see the original video again.')}</li>
                    <li>{t("You can't cancel this operation.")}</li>
                    <li>{t('It takes long time again as you may remember if you want to convert this video to MP4 again.')}</li>
                </ul>
                <p className="mb-0">{t('Are you sure to remove the converted MP4?')}</p>
            </Confirm>
            <div className={`mt-3 mt-lg-${isTheater ? 3 : 0}`}>
                <Container className="p-0">
                    <Row>
                        <Col width={[6, 6, 3, isTheater ? 3 : 12]}>
                            <DataList>
                                <dt>{t('File size')}</dt>
                                <dd>{fileSize ? formatFileSize(fileSize) : '-'}</dd>
                                <dt>{t('Modified timestamp')}</dt>
                                <dd>{mtime ? formatTime(mtime) : '-'}</dd>
                            </DataList>
                        </Col>
                        <Col width={[6, 6, 3, isTheater ? 3 : 12]}>
                            <DataList>
                                <dt>{t('Video codec')}</dt>
                                <dd>{vcodec ?? '-'}</dd>
                                <dt>{t('Audio codec')}</dt>
                                <dd>{acodec ?? '-'}</dd>
                            </DataList>
                        </Col>
                        <Col width={[12, 12, 6, isTheater ? 6 : 12]}>
                            <DataList>
                                <dt>{t('File Control')}</dt>
                                <dd>
                                    <PrimaryButton size="sm" onClick={() => setShowMoveFileModal(true)}>
                                        {t('Move')}
                                    </PrimaryButton>
                                </dd>
                            </DataList>
                        </Col>
                        <Col width={[12, 12, 6, isTheater ? 6 : 12]}>
                            <DataList>
                                <dt>
                                    <Badge variant={mp4Variant}>{t('Recommended MP4')}</Badge>
                                </dt>
                                <dd>{mp4Message}</dd>
                                <dd>{mp4ConvertButton}</dd>
                            </DataList>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default VideoDetailedInfo;
