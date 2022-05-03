import styled, { css } from 'styled-components';
import { ForwardSvg } from '../images/ForwardSvg';
import { FullScreenSvg } from '../images/FullScreenSvg';
import { MutedSvg } from '../images/MutedSvg';
import { NormalSvg } from '../images/NormalSvg';
import { PauseSvg } from '../images/PauseSvg';
import { PlaySvg } from '../images/PlaySvg';
import { RewindSvg } from '../images/RewindSvg';
import { SnapshotSvg } from '../images/SnapshotSvg';
import { SpeakerSvg } from '../images/SpeakerSvg';
import { TheaterSvg } from '../images/TheaterSvg';

const INDICATOR_ICON_SIZE = 48;
const indicatorIconAttrs = {
    width: INDICATOR_ICON_SIZE,
    height: INDICATOR_ICON_SIZE,
};
export const PlayIndicatorIcon = styled(PlaySvg).attrs(indicatorIconAttrs)`
    margin: 12px 8px 12px 16px;
`;
export const PauseIndicatorIcon = styled(PauseSvg).attrs(indicatorIconAttrs)`
    margin: 12px;
`;

const ICON_SIZE = 24;
const iconAttrs = {
    width: ICON_SIZE,
    height: ICON_SIZE,
};
const iconStyle = css`
    pointer-events: none;
`;
export const PlayIcon = styled(PlaySvg).attrs(iconAttrs)`
    ${iconStyle};
`;
export const PauseIcon = styled(PauseSvg).attrs(iconAttrs)`
    ${iconStyle};
`;
export const RewindIcon = styled(RewindSvg).attrs(iconAttrs)`
    ${iconStyle};
`;
export const ForwardIcon = styled(ForwardSvg).attrs(iconAttrs)`
    ${iconStyle};
`;
export const SpeakerIcon = styled(SpeakerSvg).attrs(iconAttrs)`
    ${iconStyle};
`;
export const MutedIcon = styled(MutedSvg).attrs(iconAttrs)`
    ${iconStyle};
`;
export const SnapshotIcon = styled(SnapshotSvg).attrs(iconAttrs)`
    ${iconStyle};
`;
export const TheaterIcon = styled(TheaterSvg).attrs(iconAttrs)`
    ${iconStyle};
`;
export const NormalIcon = styled(NormalSvg).attrs(iconAttrs)`
    ${iconStyle};
`;
export const FullScreenIcon = styled(FullScreenSvg).attrs(iconAttrs)`
    ${iconStyle};
`;
