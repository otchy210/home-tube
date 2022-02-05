import styled, { css } from 'styled-components';
import Play from '../../images/play.svg';
import Pause from '../../images/pause.svg';
import Speaker from '../../images/speaker.svg';
import Muted from '../../images/muted.svg';
import Snapshot from '../../images/snapshot.svg';
import Theater from '../../images/theater.svg';
import Normal from '../../images/normal.svg';
import FullScreen from '../../images/full-screen.svg';

const INDICATOR_ICON_SIZE = 48;
const indicatorIconAttrs = {
    width: INDICATOR_ICON_SIZE,
    height: INDICATOR_ICON_SIZE,
};
export const PlayIndicatorIcon = styled(Play).attrs(indicatorIconAttrs)`
    margin: 12px 8px 12px 16px;
`;
export const PauseIndicatorIcon = styled(Pause).attrs(indicatorIconAttrs)`
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
export const PlayIcon = styled(Play).attrs(iconAttrs)`
    ${iconStyle};
`;
export const PauseIcon = styled(Pause).attrs(iconAttrs)`
    ${iconStyle};
`;
export const SpeakerIcon = styled(Speaker).attrs(iconAttrs)`
    ${iconStyle};
`;
export const MutedIcon = styled(Muted).attrs(iconAttrs)`
    ${iconStyle};
`;
export const SnapshotIcon = styled(Snapshot).attrs(iconAttrs)`
    ${iconStyle};
`;
export const TheaterIcon = styled(Theater).attrs(iconAttrs)`
    ${iconStyle};
`;
export const NormalIcon = styled(Normal).attrs(iconAttrs)`
    ${iconStyle};
`;
export const FullScreenIcon = styled(FullScreen).attrs(iconAttrs)`
    ${iconStyle};
`;
