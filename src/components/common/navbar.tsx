import React from 'react';
import { ClassModifiedA, ClassModifiedDiv } from './ClassModifiedElements';
import { HTMLAnchorProps, HTMLDivProps } from './types';

export const Navbar: React.FC<HTMLDivProps> = (props) => {
    return <ClassModifiedDiv classModifier="border-bottom navbar navbar-expand-sm navbar-light bg-light fixed-top" {...props} />;
};

export const NavbarBrand: React.FC<HTMLAnchorProps> = (props) => {
    return <ClassModifiedA classModifier="navbar-brand" {...props} />;
};
