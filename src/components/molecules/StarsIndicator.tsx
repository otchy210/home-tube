import { Stars } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import StarIcon, { StarIconVariant } from '../atoms/StarIcon';

const POSSIBLE_STARS = [1, 2, 3, 4, 5] as Stars[];

const getVariant = (currentStart: Stars, selectedStar: Stars | undefined): StarIconVariant => {
    if (!selectedStar) {
        return 'void';
    }
    return currentStart <= selectedStar ? 'selected' : 'unselected';
};

type WrapperProps = {
    clickable?: boolean;
};

const Wrapper = styled.div<WrapperProps>`
    display: inline-block;
    line-height: 0;
    cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
`;

export type StarsMouseEventHandlers = {
    click: (stars: Stars) => void;
    hover: (stars: Stars) => void;
    out: () => void;
};

type Props = {
    size: number;
    stars?: Stars;
    on?: StarsMouseEventHandlers;
};

const StarsIndicator: React.FC<Props> = ({ size, stars, on }: Props) => {
    const wrapperRef = useRef<HTMLDivElement>(null!);
    if (on === undefined) {
        return (
            <Wrapper>
                {POSSIBLE_STARS.map((s) => {
                    const variant = getVariant(s, stars);
                    return <StarIcon variant={variant} size={size} key={`star-${s}`} />;
                })}
            </Wrapper>
        );
    }
    const starVariants: StarIconVariant[] = POSSIBLE_STARS.map((s) => {
        if (stars === undefined) {
            return 'void';
        }
        return s <= stars ? 'selected' : 'unselected';
    });
    const getHoverStars = (e: MouseEvent): Stars => {
        const parentX = wrapperRef.current.getBoundingClientRect().x ?? 0;
        const hoveredStars = Math.trunc((e.clientX - parentX) / size) + 1;
        return hoveredStars as Stars;
    };
    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            on.hover(getHoverStars(e));
        };
        const onMouseOut = () => {
            on.out();
        };
        const onMouseClick = (e: MouseEvent) => {
            on.click(getHoverStars(e));
        };
        // event lisners will be removed when the component gets ummounted
        wrapperRef.current.addEventListener('mousemove', onMouseMove);
        wrapperRef.current.addEventListener('mouseout', onMouseOut);
        wrapperRef.current.addEventListener('click', onMouseClick);
    }, [on]);
    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Wrapper clickable={on !== undefined} ref={wrapperRef as any} className="text-nowrap">
            {starVariants.map((variant, i) => {
                return <StarIcon variant={variant} size={size} key={`star-${i}`} />;
            })}
        </Wrapper>
    );
};

export default StarsIndicator;
