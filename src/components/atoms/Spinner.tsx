import React from 'react';
import SpinnerIcon from '../../images/spinner.svg';

type Props = {
    size: number;
};

const Spinner: React.FC<Props> = ({ size }: Props) => {
    return <SpinnerIcon width={size} height={size} style={{ animation: 'spinner-border 2s linear infinite' }} />;
};

export default Spinner;
