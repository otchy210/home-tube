import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import { ClassModifiedDiv, ClassModifiedInput, ClassModifiedLabel, ClassModifiedSelect } from './ClassModifiedElements';
import { HTMLCheckboxProps, HTMLElementProps, HTMLFormProps, HTMLInputProps, HTMLLabelProps, HTMLSelectProps } from './types';

export const Form: React.FC<HTMLFormProps> = (props) => {
    return <form {...props} />;
};

export const FormTextInput = forwardRef<HTMLInputElement, HTMLInputProps>((props, ref) => {
    return <ClassModifiedInput classModifier="form-control" type="text" ref={ref} {...props} />;
});

export const FormSearchInput = forwardRef<HTMLInputElement, HTMLInputProps>((props, ref) => {
    return <ClassModifiedInput classModifier="form-control" type="search" ref={ref} {...props} />;
});

export const FormSelect = forwardRef<HTMLSelectElement, HTMLSelectProps>((props, ref) => {
    return <ClassModifiedSelect classModifier="form-select" ref={ref} {...props} />;
});

export const FormCheckbox: React.FC<HTMLCheckboxProps> = ({ id, label, ...rest }) => {
    return (
        <ClassModifiedDiv classModifier="form-check" className="text-nowrap">
            <ClassModifiedInput classModifier="form-check-input" type="checkbox" id={id} {...rest} />
            {label && (
                <ClassModifiedLabel classModifier="form-check-label" htmlFor={id}>
                    {label}
                </ClassModifiedLabel>
            )}
        </ClassModifiedDiv>
    );
};

export const FormLabel: React.FC<HTMLLabelProps> = (props) => {
    return <ClassModifiedLabel classModifier="form-label" {...props} />;
};

export const FormText: React.FC<HTMLElementProps> = ({ className, ...rest }) => {
    const classes = classNames('form-text', className);
    return <small className={classes.build()} {...rest} />;
};
