import React from 'react';

type SvgProps = React.SVGAttributes<HTMLOrSVGElement>;

export const StarVoidSvg: React.FC<SvgProps> = (props) => {
    return (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" version="1.1" {...props}>
            <path
                d="M23.063 19.297 L29.234 12.703 20.375 10.984 15.984 3.078 11.625 10.984 2.75 12.703 8.922 19.297 7.813 28.281 15.984 24.438 24.172 28.281 Z"
                stroke="#666"
                stroke-width="2"
                stroke-linecap="round"
                fill="none"
            />
        </svg>
    );
};
