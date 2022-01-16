import React, { useState } from 'react';
import { Stars } from '@otchy/home-tube-api/dist/types';
import StarsIndicator, { StarsMouseEventHandlers } from './StarsIndicator';
import { Badge, Stack } from 'react-bootstrap';
import Trashcan from '../../images/trashcan.svg';
import Edit from '../../images/edit.svg';
import styled, { css } from 'styled-components';
import Confirm from './Confirm';

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
};

const VideoProperties: React.FC<Props> = ({ stars, tags, onStars, removeStars }: Props) => {
    const [showRemovalConfirm, setShowRemovalConfirm] = useState<boolean>(false);
    return (
        <>
            <Confirm
                show={showRemovalConfirm}
                setShow={setShowRemovalConfirm}
                title="Confirmation"
                body="Are you sure to remove stars?"
                submit={{ variant: 'danger', label: 'Remove', onClick: removeStars.do }}
            />
            <Stack direction="horizontal">
                <StarsIndicator size={30} stars={stars} on={onStars} />
                {removeStars.able() && <TrashcanIcon onClick={() => setShowRemovalConfirm(true)} />}
                <span className="fs-5 ms-3">
                    Tags:
                    {tags?.map((tag) => {
                        return (
                            <Badge className="ms-1" key={`tag-${tag}`}>
                                {tag}
                            </Badge>
                        );
                    })}
                    <EditIcon />
                </span>
            </Stack>
        </>
    );
};

export default VideoProperties;
