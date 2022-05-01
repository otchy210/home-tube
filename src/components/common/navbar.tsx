import React, { createContext, useContext } from 'react';
import { ClassModifiedA, ClassModifiedButton, ClassModifiedDiv, ClassModifiedUl } from './ClassModifiedElements';
import { HTMLAnchorProps, HTMLButtonProps, HTMLDivProps, HTMLUlProps } from './types';

type NavBarContextProps = {
    collapseId: string;
};
const NavbarContext = createContext<NavBarContextProps>({ collapseId: '' });

export const Navbar: React.FC<HTMLDivProps> = (props) => {
    const context: NavBarContextProps = {
        collapseId: 'navbar',
    };
    return (
        <NavbarContext.Provider value={context}>
            <ClassModifiedDiv classModifier="border-bottom navbar navbar-expand-sm navbar-light bg-light fixed-top" {...props} />
        </NavbarContext.Provider>
    );
};

export const NavbarBrand: React.FC<HTMLAnchorProps> = (props) => {
    return <ClassModifiedA classModifier="navbar-brand" {...props} />;
};

type NavbarTogglerProps = Omit<HTMLButtonProps, 'type' | 'children'>;
export const NavbarToggler: React.FC<NavbarTogglerProps> = (props) => {
    const { collapseId } = useContext(NavbarContext);
    return (
        <ClassModifiedButton type="button" classModifier="navbar-toggler" data-bs-toggle="collapse" data-bs-target={`#${collapseId}`} {...props}>
            <span className="navbar-toggler-icon"></span>
        </ClassModifiedButton>
    );
};

type NavbarCollapseProps = Omit<HTMLDivProps, 'id'>;
export const NavbarCollapse: React.FC<NavbarCollapseProps> = (props) => {
    const { collapseId } = useContext(NavbarContext);
    return <ClassModifiedDiv id={collapseId} classModifier="navbar-collapse collapse" {...props} />;
};

export const NavbarNav: React.FC<HTMLUlProps> = (props) => {
    return <ClassModifiedUl classModifier="navbar-nav" {...props} />;
};
