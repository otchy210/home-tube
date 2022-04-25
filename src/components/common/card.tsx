import React from 'react';
import { ClassModifiedDiv } from './ClassModifiedElements';
import { HTMLDivProps } from './types';

export const Card: React.FC<HTMLDivProps> = (props) => {
    return <ClassModifiedDiv classModifier="card" {...props} />;
};

export const CardBody: React.FC<HTMLDivProps> = (props) => {
    return <ClassModifiedDiv classModifier="card-body" {...props} />;
};

export const CardTitle: React.FC<HTMLDivProps> = (props) => {
    return <ClassModifiedDiv classModifier="card-title" {...props} />;
};

export const CardSubtitle: React.FC<HTMLDivProps> = (props) => {
    return <ClassModifiedDiv classModifier="card-subtitle" {...props} />;
};
