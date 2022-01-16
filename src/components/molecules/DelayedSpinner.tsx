import React, { useEffect, useState } from 'react';
import Spinner from '../atoms/Spinner';

type Props = {
    delay?: number;
};

const DelayedSpinner: React.FC<Props> = (props: Props) => {
    const [shouldShow, setShouldShow] = useState<boolean>(false);
    const delay = props.delay ?? 500;
    useEffect(() => {
        // don't show loading until 500msec to avoid frequent flashing
        const tid = setTimeout(() => {
            setShouldShow(true);
        }, delay) as unknown as number;
        return () => {
            clearTimeout(tid);
        };
    }, []);
    return <>{shouldShow && <Spinner />}</>;
};

export default DelayedSpinner;
