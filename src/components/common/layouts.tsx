import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import { ClassModifiedDiv } from './shared';
import { HTMLDivProps } from './types';

type StackGap = 0 | 1 | 2 | 3 | 4 | 5;

type InnerStackProps = HTMLDivProps & {
    gap?: StackGap;
    direction: 'h' | 'v';
};

const InnerStack: React.FC<InnerStackProps> = ({ direction, gap, className, ...rest }) => {
    const classes = classNames(className, `${direction}stack`);
    if (gap) {
        classes.add(`gap-${gap}`);
    }
    return <div className={classes.build()} {...rest} />;
};

type StackProps = Omit<InnerStackProps, 'direction'>;

export const HorizontalStack: React.FC<StackProps> = (props: StackProps) => {
    return <InnerStack direction="h" {...props} />;
};

export const VerticalStack: React.FC<StackProps> = (props: StackProps) => {
    return <InnerStack direction="v" {...props} />;
};

export const Container: React.FC<HTMLDivProps> = (props) => {
    return <ClassModifiedDiv classModifier="container" {...props} />;
};

export const FluidContainer: React.FC<HTMLDivProps> = (props) => {
    return <ClassModifiedDiv classModifier="container-fluid" {...props} />;
};

export const Row = forwardRef<HTMLDivElement, HTMLDivProps>((props, ref) => {
    return <ClassModifiedDiv classModifier="row" ref={ref} {...props} />;
});

type ColWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

const COL_CLASS_PREFIXES = ['col', 'col-sm', 'col-md', 'col-lg', 'col-xl', 'col-xxl'];

const isColWidth = (width: ColWidth | ColWidth[]): width is ColWidth => {
    return !Array.isArray(width);
};

type ColProps = HTMLDivProps & {
    width: ColWidth | ColWidth[];
};

export const Col: React.FC<ColProps> = ({ width, className, ...rest }) => {
    const classes = classNames(className);
    if (isColWidth(width)) {
        classes.add(`${COL_CLASS_PREFIXES[0]}-${width}`);
    } else {
        let prevWidth = -1;
        width.forEach((w, i) => {
            if (prevWidth !== w && COL_CLASS_PREFIXES[i]) {
                classes.add(`${COL_CLASS_PREFIXES[i]}-${w}`);
            }
            prevWidth = w;
        });
    }
    return <div className={classes.build()} {...rest} />;
};

export const HalfWidthCol: React.FC<HTMLDivProps> = (props) => {
    return <Col width={6} {...props} />;
};

export const FullWidthCol: React.FC<HTMLDivProps> = (props) => {
    return <Col width={12} {...props} />;
};
