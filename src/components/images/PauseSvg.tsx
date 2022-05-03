import React from 'react';

type SvgProps = React.SVGAttributes<HTMLOrSVGElement>;

export const PauseSvg: React.FC<SvgProps> = (props) => {
    return (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" version="1.1" {...props}>
            <path
                d="M320 59 C311.164 59 304 66.164 304 75 L304 437 C304 445.836 311.164 453 320 453 L384 453 C392.836 453 400 445.836 400 437 L400 75 C400 66.164 392.836 59 384 59 Z M128 59 C119.164 59 112 66.164 112 75 L112 437 C112 445.836 119.164 453 128 453 L192 453 C200.836 453 208 445.836 208 437 L208 75 C208 66.164 200.836 59 192 59 Z"
                fill="#fff"
            />
        </svg>
    );
};
