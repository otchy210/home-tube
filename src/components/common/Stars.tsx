import { Stars } from '@otchy/home-tube-api/dist/types';
import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { StarSelectedSvg } from '../images/StarSelectedSvg';
import { StarUnselectedSvg } from '../images/StarUnselectedSvg';
import { StarVoidSvg } from '../images/StarVoidSvg';
import { TrashcanSvg } from '../images/TrashcanSvg';
import { useI18n } from '../providers/I18nProvider';
import Confirm from './Confirm';
import { HorizontalStack } from './layouts';

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
const TrashcanIcon = styled(TrashcanSvg)`
    width: 20px;
    height: 20px;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
        opacity: 1;
    }
`;
const TrashcanIconWrapper = styled.div.attrs({ className: 'ms-1' })``;

type EditableStarsProps = {
    stars: Stars | undefined;
    saveStars: (stars: Stars) => void;
    removeStars: () => void;
};
export const EditableStars: React.FC<EditableStarsProps> = ({ stars, saveStars, removeStars }: EditableStarsProps) => {
    const [hoveringStars, setHoveringStars] = useState<Stars>();
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { t } = useI18n();
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
            saveStars(hoveringStars);
        }
    };
    return (
        <>
            <Confirm
                show={showConfirm}
                setShow={setShowConfirm}
                title={t('Confirmation')}
                submit={{ variant: 'danger', label: t('Remove raiting'), onClick: removeStars }}
            >
                {t('Are you sure to remove raiting?')}
            </Confirm>
            <HorizontalStack>
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
                {stars && (
                    <TrashcanIconWrapper onClick={() => setShowConfirm(true)}>
                        <TrashcanIcon />
                    </TrashcanIconWrapper>
                )}
            </HorizontalStack>
        </>
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
