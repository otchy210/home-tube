import React from 'react';

type SvgProps = React.SVGAttributes<HTMLOrSVGElement>;

export const TheaterSvg: React.FC<SvgProps> = (props) => {
    return (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" version="1.1" {...props}>
            <path
                d="M32 406 C23.164 406 16 398.836 16 390 L16 128 C16 119.164 23.164 112 32 112 L480 112 C488.836 112 496 119.164 496 128 L496 390 C496 398.836 488.836 406 480 406 L32 406 Z M80 358 L432 358 C440.836 358 448 350.836 448 342 L448 171 C448 162.164 440.836 155 432 155 L80 155 C71.164 155 64 162.164 64 171 L64 342 C64 350.836 71.164 358 80 358 Z"
                fill="#fff"
            />
        </svg>
    );
};
