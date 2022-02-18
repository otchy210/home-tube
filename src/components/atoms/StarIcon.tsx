import React from 'react';
import styled from 'styled-components';
import SelectedStar from '../../images/star-selected.svg';
import UnselectedStar from '../../images/star-unselected.svg';
import VoidStar from '../../images/star-void.svg';

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
                    <SelectedStar {...sizes} />
                </IconWrapper>
            );
        case 'unselected':
            return (
                <IconWrapper>
                    <UnselectedStar {...sizes} />
                </IconWrapper>
            );
        case 'void':
            return (
                <IconWrapper>
                    <VoidStar {...sizes} />
                </IconWrapper>
            );
    }
};

export default StarIcon;
