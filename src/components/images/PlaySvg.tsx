import React from 'react';

type SvgProps = React.SVGAttributes<HTMLOrSVGElement>;

export const PlaySvg: React.FC<SvgProps> = (props) => {
    return (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" version="1.1" {...props}>
            <path
                d="M96.355 472.533 C79.663 472.578 63.925 459.56 63.935 440.668 63.938 435.802 63.99 334.859 64.031 256.049 63.99 177.772 63.938 78.002 63.935 71.594 63.923 47.523 90.36 31.141 111.943 43.617 113.579 44.563 158.81 70.708 174 79.488 L174 79.434 C279.153 140.072 422.935 222.986 431.894 228.152 452.747 240.177 453.717 271.263 432.121 283.717 425.317 287.64 279.921 371.485 174 432.566 L174 432.514 C158.736 441.336 114.317 467.012 112.17 468.254 107.122 471.171 101.69 472.519 96.355 472.533 Z"
                fill="#fff"
            />
        </svg>
    );
};
