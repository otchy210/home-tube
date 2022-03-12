import React, { useState } from 'react';
import { VideoConverterStatus, VideoDetails } from '@otchy/home-tube-api/dist/types';
import StarsIndicator, { StarsMouseEventHandlers } from './StarsIndicator';
import { Badge, Button, Stack } from 'react-bootstrap';
import Trashcan from '../../images/trashcan.svg';
import Edit from '../../images/edit.svg';
import styled, { css } from 'styled-components';
import Confirm from './Confirm';
import TagsEditor from '../organisms/TagsEditor';
import StaticTag from '../atoms/StaticTag';
import { useAllTags } from '../providers/AllTagsProvider';
import { useI18n } from '../providers/I18nProvider';
import { useApi } from '../providers/ApiProvider';

const clickableIconStyles = css`
    cursor: pointer;
    opacity: 0.5;
    &:hover {
        opacity: 1;
    }
`;

const ICON_SIZE = 20;

const clickableIconAttrs = { className: 'ms-1', width: ICON_SIZE, height: ICON_SIZE };

const TrashcanIcon = styled(Trashcan).attrs(clickableIconAttrs)`
    ${clickableIconStyles};
`;

const EditIcon = styled(Edit).attrs(clickableIconAttrs)`
    ${clickableIconStyles}
`;

const IconWrapper = styled.div`
    min-width: ${ICON_SIZE}px;
`;

export type RemoveStars = {
    able: () => boolean;
    do: () => void;
};

type Props = {
    details: VideoDetails;
    onStars: StarsMouseEventHandlers;
    removeStars: RemoveStars;
    updateTags: (tags: string[]) => void;
};

const VideoProperties: React.FC<Props> = ({ details, onStars, removeStars, updateTags }: Props) => {
    const { key, stars, tags: givenTags, mp4: givenMp4 } = details;
    const [showRatingRemovalConfirm, setShowRatingRemovalConfirm] = useState<boolean>(false);
    const [showMp4Confirm, setShowMp4Confirm] = useState<boolean>(false);
    const [showMp4RemovalConfirm, setShowMp4RemovalConfirm] = useState<boolean>(false);
    const [showTagsEditor, setShowTagsEditor] = useState<boolean>(false);
    const [mp4, setMp4] = useState<VideoConverterStatus>(givenMp4 ?? 'unavailable');
    const { t } = useI18n();
    const { allTags } = useAllTags();
    const api = useApi();
    const tags = givenTags
        ? givenTags.sort((left, right) => {
              const leftCount = allTags[left];
              const rightCount = allTags[right];
              if (leftCount !== rightCount) {
                  return rightCount - leftCount;
              }
              return left.localeCompare(right);
          })
        : [];
    const [mp4Bg, mp4Message, mp4ConvertButton] = (() => {
        switch (mp4) {
            case 'available':
                return [
                    'primary',
                    t('Being ready to play instead of original.'),
                    <Button size="sm" onClick={() => setShowMp4RemovalConfirm(true)}>
                        {t('Remove MP4')}
                    </Button>,
                ];
            case 'queued':
                return ['warning', t('Waiting for converting to recommended MP4 format.'), null];
            case 'processing':
                return ['warning', t('Processing to convert this video to recommended MP4 format.'), null];
            default:
                return [
                    'secondary',
                    t('Do you want to convert this video to recommended MP4 format?'),
                    <Button size="sm" onClick={() => setShowMp4Confirm(true)}>
                        {t('Try MP4')}
                    </Button>,
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
    return (
        <>
            <Confirm
                show={showRatingRemovalConfirm}
                setShow={setShowRatingRemovalConfirm}
                title={t('Confirmation')}
                submit={{ variant: 'danger', label: t('Remove raiting'), onClick: removeStars.do }}
            >
                {t('Are you sure to remove raiting?')}
            </Confirm>
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
            <TagsEditor show={showTagsEditor} setShow={setShowTagsEditor} {...{ tags, updateTags }} />
            <Stack direction="horizontal" className="align-items-start">
                <StarsIndicator size={30} stars={stars} on={onStars} />
                {removeStars.able() && (
                    <IconWrapper>
                        <TrashcanIcon onClick={() => setShowRatingRemovalConfirm(true)} />
                    </IconWrapper>
                )}
                <div className="ms-3" style={{ lineHeight: '32px' }}>
                    {t('Tags')}:
                </div>
                <div>
                    {tags.map((tag) => {
                        return <StaticTag tag={tag} count={allTags[tag]} key={`tag-${tag}`} />;
                    })}
                    <EditIcon onClick={() => setShowTagsEditor(true)} />
                </div>
            </Stack>
            <Stack direction="horizontal" className="mt-1">
                <Badge bg={mp4Bg}>{t('Recommended MP4')}</Badge>
                <div className="text-mute ms-1">{mp4Message}</div>
                {mp4ConvertButton}
            </Stack>
        </>
    );
};

export default VideoProperties;
