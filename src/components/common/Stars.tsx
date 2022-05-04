import { Stars } from '@otchy/home-tube-api/dist/types';
import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { StarSelectedSvg } from '../images/StarSelectedSvg';
import { StarUnselectedSvg } from '../images/StarUnselectedSvg';
import { StarVoidSvg } from '../images/StarVoidSvg';

const POSSIBLE_STARS = [1, 2, 3, 4, 5] as Stars[];

const ICON_SIZE = 30;
const StarsWrapper = styled.div`
    position: relative;
    cursor: pointer;
`;
const iconStyles = css`
    width: ${ICON_SIZE}px;
    height: ${ICON_SIZE}px;
    pointer-events: none;
`;
const StarSelectedIcon = styled(StarSelectedSvg)`
    ${iconStyles};
`;
const StarUnselectedIcon = styled(StarUnselectedSvg)`
    ${iconStyles};
`;
const StarVoidIcon = styled(StarVoidSvg)`
    ${iconStyles};
`;
const HoveringStarsWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
`;

type EditableStarsProps = {
    stars: Stars | undefined;
    onSaveStars: (stars: Stars) => void;
};
export const EditableStars: React.FC<EditableStarsProps> = ({ stars, onSaveStars }: EditableStarsProps) => {
    const [hoveringStars, setHoveringStars] = useState<Stars>();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = wrapperRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const hoveringStars = (Math.trunc(x / ICON_SIZE) + 1) as Stars;
        setHoveringStars(hoveringStars);
    };
    const onMouseOut = () => {
        setHoveringStars(undefined);
    };
    const onClick = () => {
        if (hoveringStars) {
            onSaveStars(hoveringStars);
        }
    };
    return (
        <StarsWrapper onMouseMove={onMouseMove} onMouseOut={onMouseOut} onClick={onClick} ref={wrapperRef}>
            {stars
                ? POSSIBLE_STARS.map((star) => {
                      return star <= stars ? <StarSelectedIcon key={`star-${star}`} /> : <StarUnselectedIcon key={`star-${star}`} />;
                  })
                : POSSIBLE_STARS.map((star) => <StarVoidIcon key={`star-${star}`} />)}
            {hoveringStars && (
                <HoveringStarsWrapper>
                    {POSSIBLE_STARS.map((star) => {
                        return star <= hoveringStars ? <StarSelectedIcon key={`star-${star}`} /> : <StarUnselectedIcon key={`star-${star}`} />;
                    })}
                </HoveringStarsWrapper>
            )}
        </StarsWrapper>
    );
};

const smallIconStyles = css`
    width: 16px;
    height: 16px;
`;
const SmallStarSelectedIcon = styled(StarSelectedSvg)`
    ${smallIconStyles};
`;
const SmallStarUnselectedIcon = styled(StarUnselectedSvg)`
    ${smallIconStyles};
`;
const SmallStarVoidIcon = styled(StarVoidSvg)`
    ${smallIconStyles};
`;

type ReadonlyStarsProps = {
    stars: Stars | undefined;
};
export const SmallReadonlyStars: React.FC<ReadonlyStarsProps> = ({ stars }: ReadonlyStarsProps) => {
    return (
        <>
            {stars
                ? POSSIBLE_STARS.map((star) => {
                      return star <= stars ? <SmallStarSelectedIcon key={`star-${star}`} /> : <SmallStarUnselectedIcon key={`star-${star}`} />;
                  })
                : POSSIBLE_STARS.map((star) => <SmallStarVoidIcon key={`star-${star}`} />)}
        </>
    );
};
