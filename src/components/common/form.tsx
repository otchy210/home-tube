import React, { forwardRef } from 'react';
import { ClassModifiedInput } from './shared';
import { HTMLFormProps, HTMLInputProps } from './types';

export const Form: React.FC<HTMLFormProps> = (props) => {
    return <form {...props} />;
};

export const FormTextInput = forwardRef<HTMLInputElement, HTMLInputProps>((props, ref) => {
    return <ClassModifiedInput classModifier="form-control" type="text" ref={ref} {...props} />;
});

export const FormSearchInput = forwardRef<HTMLInputElement, HTMLInputProps>((props, ref) => {
    return <ClassModifiedInput classModifier="form-control" type="search" ref={ref} {...props} />;
});
