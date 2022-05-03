import styled, { css } from 'styled-components';
import { EditSvg } from '../images/EditSvg';
import { TrashcanSvg } from '../images/TrashcanSvg';

const clickableIconStyles = css`
    cursor: pointer;
    opacity: 0.5;
    &:hover {
        opacity: 1;
    }
`;

const ICON_SIZE = 20;

const clickableIconAttrs = { className: 'ms-1', width: ICON_SIZE, height: ICON_SIZE };

export const TrashcanIcon = styled(TrashcanSvg).attrs(clickableIconAttrs)`
    ${clickableIconStyles};
`;

export const EditIcon = styled(EditSvg).attrs(clickableIconAttrs)`
    ${clickableIconStyles}
`;

export const IconWrapper = styled.div`
    min-width: ${ICON_SIZE}px;
`;
