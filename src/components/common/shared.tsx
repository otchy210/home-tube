import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import { HTMLDivProps, HTMLInputProps, HTMLLabelProps, HTMLSelectProps } from './types';

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

type ClassModifiedSelectProps = HTMLSelectProps & {
    classModifier: string;
};

export const ClassModifiedSelect = forwardRef<HTMLSelectElement, ClassModifiedSelectProps>(({ classModifier, className, ...rest }, ref) => {
    const classes = classNames(classModifier, className);
    return <select className={classes.build()} ref={ref} {...rest} />;
});

type ClassModifiedLabelProps = HTMLLabelProps & {
    classModifier: string;
};

export const ClassModifiedLabel: React.FC<ClassModifiedLabelProps> = ({ classModifier, className, ...rest }) => {
    const classes = classNames(classModifier, className);
    return <label className={classes.build()} {...rest} />;
};
