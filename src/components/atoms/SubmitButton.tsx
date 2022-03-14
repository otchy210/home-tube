import React, { ReactNode } from 'react';
import { Button } from 'react-bootstrap';
import { ButtonProps } from 'react-bootstrap/esm/Button';
import styled from 'styled-components';
import Spinner from './Spinner';

const SpinnerWrapper = styled.span`
    position: absolute;
    display: inline-block;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

interface Props extends Omit<ButtonProps, 'variant' | 'style'> {
    children: ReactNode;
    submitting: boolean;
}

const SubmitButton: React.FC<Props> = (props: Props) => {
    const { children, disabled, submitting, ...rest } = props;
    const color = submitting ? 'transparent' : '#fff';
    return (
        <Button variant="primary" disabled={disabled || submitting} style={{ color, position: 'relative' }} {...rest}>
            {submitting && (
                <SpinnerWrapper>
                    <Spinner fill="#fff" size={22} />
                </SpinnerWrapper>
            )}
            {children}
        </Button>
    );
};

export default SubmitButton;
