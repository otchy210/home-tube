import React from 'react';
import SelectedStar from '../../images/star-selected.svg';
import UnselectedStar from '../../images/star-unselected.svg';
import VoidStar from '../../images/star-void.svg';

export type StarIconVariant = 'selected' | 'unselected' | 'void';

type Props = {
    variant: StarIconVariant;
    size: number;
};

const StarIcon: React.FC<Props> = ({ variant, size }: Props) => {
    const sizes = { width: size, height: size };
    switch (variant) {
        case 'selected':
            return <SelectedStar {...sizes} />;
        case 'unselected':
            return <UnselectedStar {...sizes} />;
        case 'void':
            return <VoidStar {...sizes} />;
    }
};

export default StarIcon;
