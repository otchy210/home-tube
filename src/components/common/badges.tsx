import React from 'react';
import { classNames } from '../../utils/classNames';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
    variant: BadgeVariant;
};

export const Badge: React.FC<BadgeProps> = ({ variant, className, ...rest }) => {
    const classes = classNames('badge', `bg-${variant}`, className);
    return <div className={classes.build()} {...rest} />;
};

type ColoredBadgeProps = Omit<BadgeProps, 'variant'>;

export const PrimaryBadge: React.FC<ColoredBadgeProps> = (props) => {
    return <Badge variant="primary" {...props} />;
};

export const SecondaryBadge: React.FC<ColoredBadgeProps> = (props) => {
    return <Badge variant="secondary" {...props} />;
};

export const SuccessBadge: React.FC<ColoredBadgeProps> = (props) => {
    return <Badge variant="success" {...props} />;
};

export const WarningBadge: React.FC<ColoredBadgeProps> = (props) => {
    return <Badge variant="warning" {...props} />;
};

export const DangerBadge: React.FC<ColoredBadgeProps> = (props) => {
    return <Badge variant="danger" {...props} />;
};
