import styled, { css } from 'styled-components';
import NameAsc from '../../images/name-asc.svg';
import NameDesc from '../../images/name-desc.svg';
import TimestampAsc from '../../images/timestamp-asc.svg';
import TimestampDesc from '../../images/timestamp-desc.svg';

const ICON_SIZE = 24;
const iconAttrs = {
    width: ICON_SIZE,
    height: ICON_SIZE,
};
const iconStyle = css``;
export const TimestampAscIcon = styled(TimestampAsc).attrs(iconAttrs)`
    ${iconStyle};
`;
export const TimestampDescIcon = styled(TimestampDesc).attrs(iconAttrs)`
    ${iconStyle};
`;
export const NameAscIcon = styled(NameAsc).attrs(iconAttrs)`
    ${iconStyle};
`;
export const NameDescIcon = styled(NameDesc).attrs(iconAttrs)`
    ${iconStyle};
`;
