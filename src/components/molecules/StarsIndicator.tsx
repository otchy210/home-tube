import { Stars } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import StarIcon, { StarIconVariant } from '../atoms/StarIcon';

type Props = {
    size: number;
    stars?: Stars;
    onClick?: (stars: Stars) => void;
};

const POSSIBLE_STARS = [1, 2, 3, 4, 5] as Stars[];

const getVariant = (currentStart: Stars, selectedStar: Stars | undefined): StarIconVariant => {
    if (!selectedStar) {
        return 'void';
    }
    return currentStart <= selectedStar ? 'selected' : 'unselected';
};

const StarsIndicator: React.FC<Props> = ({ size, stars, onClick }: Props) => {
    const style: React.CSSProperties = onClick ? { cursor: 'pointer' } : {};
    return (
        <>
            {POSSIBLE_STARS.map((s) => {
                const variant = getVariant(s, stars);
                return (
                    <span
                        onClick={() => {
                            onClick && onClick(s);
                        }}
                        style={style}
                        key={`star-${s}`}
                    >
                        <StarIcon variant={variant} size={size} key={`star-${s}`} />
                    </span>
                );
            })}
        </>
    );
};

export default StarsIndicator;
