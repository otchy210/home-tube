import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import { HTMLDivProps } from './types';

type ClassModifiedDivProps = HTMLDivProps & {
    classModifier: string;
};

export const ClassModifiedDiv = forwardRef<HTMLDivElement, ClassModifiedDivProps>(({ classModifier, className, ...rest }, ref) => {
    const classes = classNames(classModifier, className);
    return <div className={classes.build()} ref={ref} {...rest} />;
});
