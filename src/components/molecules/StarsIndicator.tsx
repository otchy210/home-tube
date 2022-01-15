import { Stars } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import StarIcon from '../atoms/StarIcon';

type Props = {
    size: number;
    stars?: Stars;
    onClick?: (stars: Stars) => void;
};

const POSSIBLE_STARS = [1, 2, 3, 4, 5] as Stars[];

const StarsIndicator: React.FC<Props> = ({ size, stars, onClick }: Props) => {
    if (!stars) {
        return (
            <>
                {POSSIBLE_STARS.map((s) => {
                    return <StarIcon variant="void" size={size} key={`star-${s}`} />;
                })}
            </>
        );
    }
    return (
        <>
            {POSSIBLE_STARS.map((s) => {
                const style: React.CSSProperties = onClick ? { cursor: 'pointer' } : {};
                return (
                    <span
                        onClick={() => {
                            onClick && onClick(s);
                        }}
                        style={style}
                        key={`star-${s}`}
                    >
                        <StarIcon variant={s <= stars ? 'selected' : 'unselected'} size={size} key={`star-${s}`} />
                    </span>
                );
            })}
        </>
    );
};

export default StarsIndicator;
