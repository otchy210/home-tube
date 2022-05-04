import styled from 'styled-components';
import { EditSvg } from '../images/EditSvg';

export const EditIcon = styled(EditSvg).attrs({ className: 'ms-1' })`
    width: 20px;
    height: 20px;
    cursor: pointer;
    opacity: 0.5;
    &:hover {
        opacity: 1;
    }
`;
