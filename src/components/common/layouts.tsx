import React from 'react';
import { classNames } from '../../utils/classNames';

type StackGap = 0 | 1 | 2 | 3 | 4 | 5;

type InnerStackProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
    gap?: StackGap;
    direction: 'h' | 'v';
};

const InnerStack: React.FC<InnerStackProps> = ({ children, direction, gap, className, ...rest }) => {
    const classes = classNames(className, `${direction}stack`);
    if (gap !== undefined) {
        classes.add(`gap-${gap}`);
    }
    return (
        <div className={classes.build()} {...rest}>
            {children}
        </div>
    );
};

type StackProps = Omit<InnerStackProps, 'direction'>;

export const HorizontalStack: React.FC<StackProps> = (props: StackProps) => {
    return <InnerStack direction="h" {...props} />;
};

export const VerticalStack: React.FC<StackProps> = (props: StackProps) => {
    return <InnerStack direction="v" {...props} />;
};
