import React from 'react';
import { classNames } from '../../utils/classNames';
import { HTMLDivProps } from './types';

type ClassModifiedDivProps = HTMLDivProps & {
    classModifier: string;
};

export const ClassModifiedDiv: React.FC<ClassModifiedDivProps> = ({ classModifier, className, ...rest }) => {
    const classes = classNames(classModifier, className);
    return <div className={classes.build()} {...rest} />;
};
