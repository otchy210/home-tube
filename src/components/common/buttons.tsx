import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { classNames } from '../../utils/classNames';
import Spinner from '../atoms/Spinner';

type InnerProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    variant: 'primary' | 'secondary' | 'danger' | 'link';
    size?: 'sm' | 'lg';
};

const InnerButton = forwardRef<HTMLButtonElement, InnerProps>(({ variant, size, className, ...rest }, ref) => {
    const classes = classNames(className, 'btn', `btn-${variant}`, 'text-nowrap');
    if (size) {
        classes.add(`btn-${size}`);
    }
    return <button type="button" className={classes.build()} {...rest} ref={ref} />;
});

type ButtonProps = Omit<InnerProps, 'variant'>;

export const PrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    return <InnerButton variant="primary" ref={ref} {...props} />;
});

export const SecondaryButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    return <InnerButton variant="secondary" ref={ref} {...props} />;
});

export const DangerButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    return <InnerButton variant="danger" ref={ref} {...props} />;
});

export const LinkButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    return <InnerButton variant="link" ref={ref} {...props} />;
});

const SpinnerWrapper = styled.span`
    position: absolute;
    display: inline-block;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

interface SubmitButtonProps extends Omit<ButtonProps, 'style'> {
    submitting: boolean;
}

export const SubmitButton = (props: SubmitButtonProps) => {
    const { children, disabled, submitting, ...rest } = props;
    const color = submitting ? 'transparent' : '#fff';
    return (
        <PrimaryButton disabled={disabled || submitting} style={{ color, position: 'relative' }} {...rest}>
            {submitting && (
                <SpinnerWrapper>
                    <Spinner fill="#fff" size={22} />
                </SpinnerWrapper>
            )}
            {children}
        </PrimaryButton>
    );
};
