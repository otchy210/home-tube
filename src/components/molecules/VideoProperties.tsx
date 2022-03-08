import React, { useState } from 'react';
import { Stars, VideoConverterStatus } from '@otchy/home-tube-api/dist/types';
import StarsIndicator, { StarsMouseEventHandlers } from './StarsIndicator';
import { Badge, Stack } from 'react-bootstrap';
import Trashcan from '../../images/trashcan.svg';
import Edit from '../../images/edit.svg';
import styled, { css } from 'styled-components';
import Confirm from './Confirm';
import TagsEditor from '../organisms/TagsEditor';
import StaticTag from '../atoms/StaticTag';
import { useAllTags } from '../providers/AllTagsProvider';
import { useI18n } from '../providers/I18nProvider';

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
    stars: Stars | undefined;
    tags: string[] | undefined;
    mp4: VideoConverterStatus | undefined;
    onStars: StarsMouseEventHandlers;
    removeStars: RemoveStars;
    updateTags: (tags: string[]) => void;
};

const VideoProperties: React.FC<Props> = ({ stars, tags: givenTags, mp4, onStars, removeStars, updateTags }: Props) => {
    const [showRemovalConfirm, setShowRemovalConfirm] = useState<boolean>(false);
    const [showTagsEditor, setShowTagsEditor] = useState<boolean>(false);
    const { t } = useI18n();
    const { allTags } = useAllTags();
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
    const mp4Bg = (() => {
        switch (mp4) {
            case 'available':
                return 'primary';
            case 'queued':
                return 'success';
            case 'processing':
                return 'warning';
            default:
                return 'secondary';
        }
    })();
    return (
        <>
            <Confirm
                show={showRemovalConfirm}
                setShow={setShowRemovalConfirm}
                title={t('Confirmation')}
                body={t('Are you sure to remove raiting?')}
                submit={{ variant: 'danger', label: t('Remove raiting'), onClick: removeStars.do }}
            />
            <TagsEditor show={showTagsEditor} setShow={setShowTagsEditor} {...{ tags, updateTags }} />
            <Stack direction="horizontal" className="align-items-start">
                <StarsIndicator size={30} stars={stars} on={onStars} />
                {removeStars.able() && (
                    <IconWrapper>
                        <TrashcanIcon onClick={() => setShowRemovalConfirm(true)} />
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
                <div className="text-mute ms-1">
                    {(() => {
                        switch (mp4) {
                            case 'available':
                                return t('Being able to play instead of original.');
                            case 'queued':
                                return t('Waiting for converting to recommended MP4 format.');
                            case 'processing':
                                return t('Processing to convert this video to recommended MP4 format.');
                            default:
                                return t('Do you want to convert this video to recommended MP4 format?');
                        }
                    })()}
                </div>
            </Stack>
        </>
    );
};

export default VideoProperties;
