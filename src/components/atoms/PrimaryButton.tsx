import React, { ReactNode } from 'react';
import { classNames } from '../../utils/classNames';

type Props = {
    className?: string;
    children: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const PrimaryButton: React.FC<Props> = ({ className, children, onClick }) => {
    return (
        <button type="button" className={classNames('btn btn-primary text-nowrap', className)} onClick={onClick}>
            {children}
        </button>
    );
};

export default PrimaryButton;
