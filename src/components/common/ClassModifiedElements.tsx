import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import { HTMLDivProps, HTMLElementProps, HTMLInputProps, HTMLLabelProps, HTMLLiProps, HTMLSelectProps, HTMLUlProps } from './types';

type ClassModifierProps = {
    classModifier: string;
};

type ClassModifiedElementProps = ClassModifierProps &
    HTMLElementProps & {
        as: string;
    };

export const ClassModifiedElement = forwardRef<HTMLElement, ClassModifiedElementProps>(({ as: tagName, classModifier, className, ...rest }, ref) => {
    const classes = classNames(classModifier, className);
    return React.createElement(tagName, { className: classes.build(), ref, ...rest });
});

type ClassModifiedDivProps = HTMLDivProps & ClassModifierProps;

export const ClassModifiedDiv = forwardRef<HTMLDivElement, ClassModifiedDivProps>(({ classModifier, className, ...rest }, ref) => {
    const classes = classNames(classModifier, className);
    return <div className={classes.build()} ref={ref} {...rest} />;
});

type ClassModifiedInputProps = HTMLInputProps &
    ClassModifierProps & {
        type: React.HTMLInputTypeAttribute;
    };

export const ClassModifiedInput = forwardRef<HTMLInputElement, ClassModifiedInputProps>(({ classModifier, type, isInvalid, className, ...rest }, ref) => {
    const classes = classNames(classModifier, className);
    if (isInvalid) {
        classes.add('is-invalid');
    }
    return <input type={type} className={classes.build()} ref={ref} {...rest} />;
});

type ClassModifiedSelectProps = HTMLSelectProps & ClassModifierProps;

export const ClassModifiedSelect = forwardRef<HTMLSelectElement, ClassModifiedSelectProps>(({ classModifier, className, ...rest }, ref) => {
    const classes = classNames(classModifier, className);
    return <select className={classes.build()} ref={ref} {...rest} />;
});

type ClassModifiedLabelProps = HTMLLabelProps & ClassModifierProps;

export const ClassModifiedLabel: React.FC<ClassModifiedLabelProps> = ({ classModifier, className, ...rest }) => {
    const classes = classNames(classModifier, className);
    return <label className={classes.build()} {...rest} />;
};

type ClassModifiedUlProps = HTMLUlProps & ClassModifierProps;

export const ClassModifiedUl: React.FC<ClassModifiedUlProps> = (props) => {
    return <ClassModifiedElement as="ul" {...props} />;
};

type ClassModifiedLiProps = HTMLLiProps & ClassModifierProps;

export const ClassModifiedLi: React.FC<ClassModifiedLiProps> = (props) => {
    return <ClassModifiedElement as="li" {...props} />;
};
