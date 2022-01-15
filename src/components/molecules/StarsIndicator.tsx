import { Stars } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useRef, useState } from 'react';
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

type StarsWrapperProps = {
    size: number;
    stars: number;
};
const StarsWrapper = styled.div<StarsWrapperProps>`
    display: inline-block;
    width: ${(props) => `${props.size * props.stars}px`};
    height: ${(props) => `${props.size}px`};
    overflow: hidden;
`;

type Props = {
    size: number;
    stars?: Stars;
    onClick?: (stars: Stars) => void;
};

const StarsIndicator2: React.FC<Props> = ({ size, stars, onClick }: Props) => {
    const wrapperRef = useRef<HTMLDivElement>();
    const [selectedStars, setSelectedStars] = useState<number>(stars ?? 0);
    const [unselectedStars, setUnselectedStars] = useState<number>(stars ? 5 - stars : 0);
    const [voidStars, setVoidStars] = useState<number>(stars ? 0 : 5);
    const clickable = onClick !== undefined;
    if (!clickable) {
        return (
            <Wrapper>
                {POSSIBLE_STARS.map((s) => {
                    const variant = getVariant(s, stars);
                    return <StarIcon variant={variant} size={size} key={`star-${s}`} />;
                })}
            </Wrapper>
        );
    }
    const setStars = (stars: number | undefined) => {
        setSelectedStars(stars ?? 0);
        setUnselectedStars(stars ? 5 - stars : 0);
        setVoidStars(stars ? 0 : 5);
    };
    const getHoverStars = (e: MouseEvent): number => {
        const parentX = wrapperRef.current?.getBoundingClientRect().x ?? 0;
        const hoveredStars = Math.trunc((e.clientX - parentX) / size) + 1;
        return hoveredStars;
    };
    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            setStars(getHoverStars(e));
        };
        const onMouseOut = () => {
            setStars(stars);
        };
        const onMouseClick = (e: MouseEvent) => {
            onClick(getHoverStars(e) as Stars);
        };
        wrapperRef.current?.addEventListener('mousemove', onMouseMove);
        wrapperRef.current?.addEventListener('mouseout', onMouseOut);
        wrapperRef.current?.addEventListener('click', onMouseClick);
        return () => {
            wrapperRef.current?.removeEventListener('mousemove', onMouseMove);
            wrapperRef.current?.removeEventListener('mouseout', onMouseOut);
            wrapperRef.current?.removeEventListener('click', onMouseClick);
        };
    }, []);
    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Wrapper clickable={onClick !== undefined} ref={wrapperRef as any}>
            <StarsWrapper size={size} stars={selectedStars}>
                {POSSIBLE_STARS.map((s) => {
                    return <StarIcon variant="selected" size={size} key={`star-selected-${s}`} />;
                })}
            </StarsWrapper>
            <StarsWrapper size={size} stars={unselectedStars}>
                {POSSIBLE_STARS.map((s) => {
                    return <StarIcon variant="unselected" size={size} key={`star-unselected-${s}`} />;
                })}
            </StarsWrapper>
            <StarsWrapper size={size} stars={voidStars}>
                {POSSIBLE_STARS.map((s) => {
                    return <StarIcon variant="void" size={size} key={`star-void-${s}`} />;
                })}
            </StarsWrapper>
        </Wrapper>
    );
};

export default StarsIndicator2;
