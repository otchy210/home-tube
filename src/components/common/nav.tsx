import React from 'react';
import { ClassModifiedA, ClassModifiedLi, ClassModifiedUl } from './ClassModifiedElements';
import { HTMLAnchorProps, HTMLLiProps, HTMLUlProps } from './types';

export const NavLink: React.FC<HTMLAnchorProps> = (props) => {
    return <ClassModifiedA classModifier="nav-link" {...props} />;
};

export const NavItem: React.FC<HTMLLiProps> = (props) => {
    return <ClassModifiedLi classModifier="nav-item" {...props} />;
};

export const NavItemDropdown: React.FC<HTMLLiProps> = (props) => {
    return <ClassModifiedLi classModifier="nav-item dropdown" {...props} />;
};

type NavLinkDropdownProps = Omit<HTMLAnchorProps, 'role'>;
export const NavLinkDropdown: React.FC<NavLinkDropdownProps> = (props) => {
    return <ClassModifiedA classModifier="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" {...props} />;
};

type DropdownMenuProps = HTMLUlProps & {
    position?: 'start' | 'end';
};
export const DropdownMenu: React.FC<DropdownMenuProps> = ({ position, ...rest }) => {
    return <ClassModifiedUl classModifier={`dropdown-menu dropdown-menu-${position ?? 'start'}`} {...rest} />;
};

export const DropdownItem: React.FC<HTMLAnchorProps> = (props) => {
    return (
        <li>
            <ClassModifiedA classModifier="dropdown-item" {...props} />
        </li>
    );
};
