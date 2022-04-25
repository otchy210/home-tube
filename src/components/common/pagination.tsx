import React from 'react';
import { classNames } from '../../utils/classNames';
import { ClassModifiedLi, ClassModifiedUl } from './ClassModifiedElements';
import { HTMLElementProps, HTMLUlProps } from './types';

export const Pagination: React.FC<HTMLUlProps> = (props) => {
    return <ClassModifiedUl classModifier="pagination" {...props} />;
};

type PageItemProps = HTMLElementProps & {
    active?: boolean;
    disabled?: boolean;
};

export const PageItem: React.FC<PageItemProps> = ({ active, disabled, style, children, ...rest }) => {
    const classModifier = classNames('page-item');
    const pageLinkClassName = classNames('page-link');
    const liStyle = style ?? {};
    if (active || disabled) {
        if (active) {
            classModifier.add('active');
            pageLinkClassName.add('active');
        }
        if (disabled) {
            classModifier.add('disabled');
            pageLinkClassName.add('disabled');
        }
        liStyle.pointerEvents = 'none';
    } else {
        liStyle.cursor = 'pointer';
    }
    const pageLink = (() => {
        if (active || disabled) {
            return <span className={pageLinkClassName.build()} children={children} />;
        } else {
            return <a className={pageLinkClassName.build()} children={children} />;
        }
    })();
    return (
        <ClassModifiedLi classModifier={classModifier.build()!} style={liStyle} {...rest}>
            {pageLink}
        </ClassModifiedLi>
    );
};

type ChildPreDefinedPageItemProps = PageItemProps & {
    child: string;
};

const ChildPreDefinedPageItem: React.FC<ChildPreDefinedPageItemProps> = ({ child, children, ...rest }) => {
    const c = children ?? child ?? '';
    return <PageItem {...rest}>{c}</PageItem>;
};

export const PageItemFirst: React.FC<PageItemProps> = (props) => {
    return <ChildPreDefinedPageItem child="«" {...props} />;
};

export const PageItemPrev: React.FC<PageItemProps> = (props) => {
    return <ChildPreDefinedPageItem child="‹" {...props} />;
};

export const PageItemEllipsis: React.FC<PageItemProps> = (props) => {
    return <ChildPreDefinedPageItem child="…" {...props} />;
};

export const PageItemNext: React.FC<PageItemProps> = (props) => {
    return <ChildPreDefinedPageItem child="›" {...props} />;
};

export const PageItemLast: React.FC<PageItemProps> = (props) => {
    return <ChildPreDefinedPageItem child="»" {...props} />;
};
