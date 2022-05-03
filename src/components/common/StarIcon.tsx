import React from 'react';
import styled from 'styled-components';
import { StarSelectedSvg } from '../images/StarSelectedSvg';
import { StarUnselectedSvg } from '../images/StarUnselectedSvg';
import { StarVoidSvg } from '../images/StarVoidSvg';

const IconWrapper = styled.div`
    display: inline-box;
    pointer-events: none;
`;

export type StarIconVariant = 'selected' | 'unselected' | 'void';

type Props = {
    variant: StarIconVariant;
    size: number;
};

const StarIcon: React.FC<Props> = ({ variant, size }: Props) => {
    const sizes = { width: size, height: size };
    switch (variant) {
        case 'selected':
            return (
                <IconWrapper>
                    <StarSelectedSvg {...sizes} />
                </IconWrapper>
            );
        case 'unselected':
            return (
                <IconWrapper>
                    <StarUnselectedSvg {...sizes} />
                </IconWrapper>
            );
        case 'void':
            return (
                <IconWrapper>
                    <StarVoidSvg {...sizes} />
                </IconWrapper>
            );
    }
};

export default StarIcon;
