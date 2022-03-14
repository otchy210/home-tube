import React from 'react';
import SpinnerSvg from '../../images/spinner.svg';
import { Property } from 'csstype';
import styled from 'styled-components';

const SpinnerIcon = styled(SpinnerSvg)`
    & > path {
        fill: ${(props) => props.fill};
    }
`;

type Props = {
    size?: number;
    fill?: Property.Color;
};

const DEFAULT_ICON_SIZE = 32;

const Spinner: React.FC<Props> = ({ size, fill }: Props) => {
    const iconSize = {
        width: size ?? DEFAULT_ICON_SIZE,
        height: size ?? DEFAULT_ICON_SIZE,
    };
    return <SpinnerIcon {...iconSize} fill={fill} style={{ animation: 'spinner-border 2s linear infinite' }} />;
};

export default Spinner;
