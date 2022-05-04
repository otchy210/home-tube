import React from 'react';

type SvgProps = React.SVGAttributes<HTMLOrSVGElement>;

export const RightArrowSvg: React.FC<SvgProps> = (props) => {
    return (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fill="#fff"
                d="M 321.431641 429.824219 C 317.336872 429.824219 313.24136 428.260884 310.117188 425.136719 L 264.863281 379.882813 C 258.614966 373.634482 258.614935 363.502252 264.863281 357.253906 L 318.117188 304 L 32 304 C 23.163538 304 16 296.836454 16 288 L 16 224 C 16 215.163531 23.163538 208 32 208 L 318.117188 208 L 264.863281 154.746094 C 258.614942 148.497754 258.614942 138.365527 264.863281 132.117188 L 310.117188 86.863281 C 316.365527 80.614972 326.497754 80.614972 332.746094 86.863281 L 441.763672 195.880859 C 443.249247 196.628764 444.642471 197.622946 445.882813 198.863281 L 491.136719 244.117188 C 494.40558 247.386065 495.963906 251.71775 495.8125 256 C 495.963621 260.282306 494.405319 264.614204 491.136719 267.882813 L 445.882813 313.136719 C 444.642473 314.377056 443.249387 315.370997 441.763672 316.119141 L 332.746094 425.136719 C 329.621921 428.260884 325.526409 429.824219 321.431641 429.824219 Z"
            />
        </svg>
    );
};