import React from 'react';
import SpinnerIcon from '../../images/spinner.svg';

type Props = {
    size?: number;
};

const DEFAULT_ICON_SIZE = 32;

const Spinner: React.FC<Props> = ({ size }: Props) => {
    const iconSize = {
        width: size ?? DEFAULT_ICON_SIZE,
        height: size ?? DEFAULT_ICON_SIZE,
    };
    return <SpinnerIcon {...iconSize} style={{ animation: 'spinner-border 2s linear infinite' }} />;
};

export default Spinner;
