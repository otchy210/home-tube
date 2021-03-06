import React from 'react';

type SvgProps = React.SVGAttributes<HTMLOrSVGElement>;

export const IconSvg: React.FC<SvgProps> = (props) => {
    return (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" version="1.1" {...props}>
            <path
                d="M122 496 C113.163 496 106 488.836 106 480 L106 269.117 C80.969 269.117 21.347 269.117 21.347 269.117 14.02 261.79 14.02 249.911 21.347 242.584 L242.734 21.197 C250.061 13.87 261.94 13.87 269.267 21.197 L490.654 242.584 C497.981 249.911 497.981 261.79 490.654 269.117 490.654 269.117 430.559 269.117 405 269.117 L405 480 C405 488.836 397.836 496 389 496 L122 496 Z"
                fill="#f90"
            />
            <path d="M354 301 L184 203 184 399 Z" fill="#fff" />
        </svg>
    );
};
