import styled, { css } from 'styled-components';
import { NameAscSvg } from '../images/NameAscSvg';
import { NameDescSvg } from '../images/NameDescSvg';
import { TimestampAscSvg } from '../images/TimestampAscSvg';
import { TimestampDescSvg } from '../images/TimestampDescSvg';

const ICON_SIZE = 24;
const iconAttrs = {
    width: ICON_SIZE,
    height: ICON_SIZE,
};
const iconStyle = css``;
export const TimestampAscIcon = styled(TimestampAscSvg).attrs(iconAttrs)`
    ${iconStyle};
`;
export const TimestampDescIcon = styled(TimestampDescSvg).attrs(iconAttrs)`
    ${iconStyle};
`;
export const NameAscIcon = styled(NameAscSvg).attrs(iconAttrs)`
    ${iconStyle};
`;
export const NameDescIcon = styled(NameDescSvg).attrs(iconAttrs)`
    ${iconStyle};
`;
