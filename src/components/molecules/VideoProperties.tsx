import React, { useState } from 'react';
import { Stars } from '@otchy/home-tube-api/dist/types';
import StarsIndicator, { StarsMouseEventHandlers } from './StarsIndicator';
import { Stack } from 'react-bootstrap';
import Trashcan from '../../images/trashcan.svg';
import Edit from '../../images/edit.svg';
import styled, { css } from 'styled-components';
import Confirm from './Confirm';
import TagsEditor from '../organisms/TagsEditor';
import StaticTag from '../atoms/StaticTag';
import { useAllTags } from '../providers/AllTagsProvider';

const clickableIconStyles = css`
    cursor: pointer;
    opacity: 0.5;
    &:hover {
        opacity: 1;
    }
`;

const clickableIconAttrs = { className: 'ms-1', width: '20', height: '20' };

const TrashcanIcon = styled(Trashcan).attrs(clickableIconAttrs)`
    ${clickableIconStyles};
`;

const EditIcon = styled(Edit).attrs(clickableIconAttrs)`
    ${clickableIconStyles}
`;

export type RemoveStars = {
    able: () => boolean;
    do: () => void;
};

type Props = {
    stars: Stars | undefined;
    tags: string[] | undefined;
    onStars: StarsMouseEventHandlers;
    removeStars: RemoveStars;
    updateTags: (tags: string[]) => void;
};

const VideoProperties: React.FC<Props> = ({ stars, tags: givenTags, onStars, removeStars, updateTags }: Props) => {
    const [showRemovalConfirm, setShowRemovalConfirm] = useState<boolean>(false);
    const [showTagsEditor, setShowTagsEditor] = useState<boolean>(false);
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
    return (
        <>
            <Confirm
                show={showRemovalConfirm}
                setShow={setShowRemovalConfirm}
                title="Confirmation"
                body="Are you sure to remove stars?"
                submit={{ variant: 'danger', label: 'Remove', onClick: removeStars.do }}
            />
            <TagsEditor show={showTagsEditor} setShow={setShowTagsEditor} {...{ tags, updateTags }} />
            <Stack direction="horizontal" className="align-items-start">
                <StarsIndicator size={30} stars={stars} on={onStars} />
                {removeStars.able() && <TrashcanIcon onClick={() => setShowRemovalConfirm(true)} />}
                <div className="ms-3" style={{ lineHeight: '32px' }}>
                    Tags:
                </div>
                <div>
                    {tags.map((tag) => {
                        return <StaticTag name={`${tag} (${allTags[tag]})`} key={`tag-${tag}`} />;
                    })}
                    <EditIcon onClick={() => setShowTagsEditor(true)} />
                </div>
            </Stack>
        </>
    );
};

export default VideoProperties;
