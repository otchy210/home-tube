import { VideoConverterStatus, VideoDetails } from '@otchy/home-tube-api/dist/types';
import Tree from 'rc-tree';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'rc-tree/assets/index.css';
import { VideoViewMode, FolderData, TreeNode } from '../../types';
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
    const [folderData, setFolderData] = useState<TreeNode[]>([]);
    const [loadingFolders, setLoadingFolders] = useState<boolean>(false);
    const api = useApi();
    const { t } = useI18n();

    const transformFolderData = (folders: FolderData[], isRoot = true): TreeNode[] => {
        return folders.map((folder) => ({
            key: folder.path,
            title: isRoot ? folder.path : folder.name,
            children: folder.folders.length > 0 ? transformFolderData(folder.folders, false) : undefined,
        }));
    };

    useEffect(() => {
        if (showMoveFileModal && folderData.length === 0) {
            setLoadingFolders(true);
            api.getFolders()
                .then((folders) => {
                    const transformedData = transformFolderData(folders);
                    setFolderData(transformedData);
                })
                .catch((error) => {
                    console.error('Failed to load folders:', error);
                    setFolderData([]);
                })
                .finally(() => {
                    setLoadingFolders(false);
                });
        }
    }, [showMoveFileModal, folderData.length, api]);

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
                        {loadingFolders ? (
                            <div className="text-center py-3">
                                <div className="spinner-border spinner-border-sm me-2" role="status">
                                    <span className="visually-hidden">{t('Loading...')}</span>
                                </div>
                                {t('Loading folders...')}
                            </div>
                        ) : folderData.length > 0 ? (
                            <Tree
                                treeData={folderData}
                                onSelect={(selectedKeys) => {
                                    if (selectedKeys.length > 0) {
                                        setSelectedFolder(selectedKeys[0] as string);
                                    }
                                }}
                                showIcon
                                defaultExpandAll
                                icon={({ expanded }) => <span className="fs-6">{expanded ? '📂' : '📁'}</span>}
                            />
                        ) : (
                            <div className="text-center py-3 text-muted">{t('No folders available')}</div>
                        )}
                    </div>
                    <div className="mt-3 p-2 bg-light rounded">
                        <strong>{t('Selected folder:')}</strong> {selectedFolder || t('None selected')}
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
