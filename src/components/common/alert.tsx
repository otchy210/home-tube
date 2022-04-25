import React from 'react';
import { ClassModifiedA, ClassModifiedDiv } from './ClassModifiedElements';
import { HTMLAnchorProps, HTMLDivProps } from './types';

type AlertProps = HTMLDivProps & {
    variant: 'primary' | 'danger';
};

const Alert: React.FC<AlertProps> = ({ variant, ...rest }) => {
    return <ClassModifiedDiv classModifier={`alert alert-${variant}`} {...rest} />;
};

export const PrimaryAlert: React.FC<HTMLDivProps> = (props) => {
    return <Alert variant="primary" {...props} />;
};

export const DangerAlert: React.FC<HTMLDivProps> = (props) => {
    return <Alert variant="danger" {...props} />;
};

export const AlertLink: React.FC<HTMLAnchorProps> = (props) => {
    return <ClassModifiedA classModifier="alert-link" {...props} />;
};
