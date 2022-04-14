import React, { forwardRef } from 'react';
import styled from 'styled-components';
import Spinner from '../atoms/Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'link';

type ButtonSize = 'sm' | 'lg';

interface InnerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    variant: ButtonVariant;
    size?: ButtonSize;
}

const InnerButton = forwardRef<HTMLButtonElement, InnerProps>(({ children, variant, size, className, ...rest }, ref) => {
    const classNames = ['btn', `btn-${variant}`, 'text-nowrap'];
    if (size) {
        classNames.push(`btn-${size}`);
    }
    if (className) {
        classNames.push(className);
    }
    return (
        <button type="button" className={classNames.join(' ')} {...rest} ref={ref}>
            {children}
        </button>
    );
});

type Props = Omit<InnerProps, 'variant'>;

export const PrimaryButton = forwardRef<HTMLButtonElement, Props>(({ children, ...rest }, ref) => {
    return (
        <InnerButton variant="primary" {...rest} ref={ref}>
            {children}
        </InnerButton>
    );
});

export const SecondaryButton = forwardRef<HTMLButtonElement, Props>(({ children, ...rest }, ref) => {
    return (
        <InnerButton variant="secondary" {...rest} ref={ref}>
            {children}
        </InnerButton>
    );
});

export const DangerButton = forwardRef<HTMLButtonElement, Props>(({ children, ...rest }, ref) => {
    return (
        <InnerButton variant="danger" {...rest} ref={ref}>
            {children}
        </InnerButton>
    );
});

export const LinkButton = forwardRef<HTMLButtonElement, Props>(({ children, ...rest }, ref) => {
    return (
        <InnerButton variant="link" {...rest} ref={ref}>
            {children}
        </InnerButton>
    );
});

const SpinnerWrapper = styled.span`
    position: absolute;
    display: inline-block;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

interface SubmitButtonProps extends Omit<Props, 'style'> {
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
