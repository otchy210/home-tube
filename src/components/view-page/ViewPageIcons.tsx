import styled, { css } from 'styled-components';
import Edit from '../../images/edit.svg';
import Trashcan from '../../images/trashcan.svg';

const clickableIconStyles = css`
    cursor: pointer;
    opacity: 0.5;
    &:hover {
        opacity: 1;
    }
`;

const ICON_SIZE = 20;

const clickableIconAttrs = { className: 'ms-1', width: ICON_SIZE, height: ICON_SIZE };

export const TrashcanIcon = styled(Trashcan).attrs(clickableIconAttrs)`
    ${clickableIconStyles};
`;

export const EditIcon = styled(Edit).attrs(clickableIconAttrs)`
    ${clickableIconStyles}
`;

export const IconWrapper = styled.div`
    min-width: ${ICON_SIZE}px;
`;
