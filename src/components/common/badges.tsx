import React from 'react';
import { ClassModifiedDiv } from './shared';
import { HTMLDivProps } from './types';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

type BadgeProps = HTMLDivProps & {
    variant: BadgeVariant;
};

export const Badge: React.FC<BadgeProps> = ({ variant, ...rest }) => {
    return <ClassModifiedDiv classModifier={`badge bg-${variant}`} {...rest} />;
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
