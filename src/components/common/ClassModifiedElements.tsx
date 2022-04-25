import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import {
    HTMLAnchorProps,
    HTMLButtonProps,
    HTMLDivProps,
    HTMLElementProps,
    HTMLInputProps,
    HTMLLabelProps,
    HTMLLiProps,
    HTMLSelectProps,
    HTMLUlProps,
} from './types';

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

export const ClassModifiedDiv = forwardRef<HTMLDivElement, ClassModifiedDivProps>((props, ref) => {
    return <ClassModifiedElement as="div" ref={ref} {...props} />;
});

type ClassModifiedInputProps = HTMLInputProps &
    ClassModifierProps & {
        type: React.HTMLInputTypeAttribute;
    };

export const ClassModifiedInput = forwardRef<HTMLInputElement, ClassModifiedInputProps>(({ isInvalid, className, ...rest }, ref) => {
    const classes = classNames(className);
    if (isInvalid) {
        classes.add('is-invalid');
    }
    return <ClassModifiedElement as="input" className={classes.build()} ref={ref} {...rest} />;
});

type ClassModifiedSelectProps = HTMLSelectProps & ClassModifierProps;

export const ClassModifiedSelect = forwardRef<HTMLSelectElement, ClassModifiedSelectProps>((props, ref) => {
    return <ClassModifiedElement as="select" ref={ref} {...props} />;
});

type ClassModifiedLabelProps = HTMLLabelProps & ClassModifierProps;

export const ClassModifiedLabel: React.FC<ClassModifiedLabelProps> = (props) => {
    return <ClassModifiedElement as="label" {...props} />;
};

type ClassModifiedUlProps = HTMLUlProps & ClassModifierProps;

export const ClassModifiedUl: React.FC<ClassModifiedUlProps> = (props) => {
    return <ClassModifiedElement as="ul" {...props} />;
};

type ClassModifiedLiProps = HTMLLiProps & ClassModifierProps;

export const ClassModifiedLi: React.FC<ClassModifiedLiProps> = (props) => {
    return <ClassModifiedElement as="li" {...props} />;
};

type ClassModifiedAnchorProps = HTMLAnchorProps & ClassModifierProps;

export const ClassModifiedA: React.FC<ClassModifiedAnchorProps> = (props) => {
    return <ClassModifiedElement as="a" {...props} />;
};

type ClassModifiedButtonProps = HTMLButtonProps & ClassModifierProps;

export const ClassModifiedButton: React.FC<ClassModifiedButtonProps> = (props) => {
    return <ClassModifiedElement as="button" {...props} />;
};
