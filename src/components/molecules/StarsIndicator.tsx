import { Stars } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import StarIcon from '../atoms/StarIcon';

type Props = {
    stars?: Stars;
    onClick: (stars: Stars) => void;
};

const POSSIBLE_STARS = [1, 2, 3, 4, 5] as Stars[];

const StarsIndicator: React.FC<Props> = ({ stars, onClick }: Props) => {
    if (!stars) {
        return (
            <>
                {POSSIBLE_STARS.map((s) => {
                    return <StarIcon variant="void" size={32} key={`star-${s}`} />;
                })}
            </>
        );
    }
    return (
        <>
            {POSSIBLE_STARS.map((s) => {
                return (
                    <span
                        onClick={() => {
                            onClick(s);
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <StarIcon variant={s <= stars ? 'selected' : 'unselected'} size={30} key={`star-${s}`} />
                    </span>
                );
            })}
        </>
    );
};

export default StarsIndicator;
