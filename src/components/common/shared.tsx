import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import { HTMLDivProps, HTMLInputProps } from './types';

type ClassModifiedDivProps = HTMLDivProps & {
    classModifier: string;
};

export const ClassModifiedDiv = forwardRef<HTMLDivElement, ClassModifiedDivProps>(({ classModifier, className, ...rest }, ref) => {
    const classes = classNames(classModifier, className);
    return <div className={classes.build()} ref={ref} {...rest} />;
});

type ClassModifiedInputProps = HTMLInputProps & {
    classModifier: string;
    type: React.HTMLInputTypeAttribute;
};

export const ClassModifiedInput = forwardRef<HTMLInputElement, ClassModifiedInputProps>(({ classModifier, type, isInvalid, className, ...rest }, ref) => {
    const classes = classNames(classModifier, className);
    if (isInvalid) {
        classes.add('is-invalid');
    }
    return <input type={type} className={classes.build()} ref={ref} {...rest} />;
});
