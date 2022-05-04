import React from 'react';

type SvgProps = React.SVGAttributes<HTMLOrSVGElement>;

export const TimestampDescSvg: React.FC<SvgProps> = (props) => {
    return (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fill="#fff"
                d="M 416 495.769531 C 407.163513 495.769531 400 488.606018 400 479.769531 L 400 101.710938 L 384.857422 116.853516 C 378.6091 123.101837 368.47879 123.101837 362.230469 116.853516 L 350.916016 105.539063 C 344.667694 99.290741 344.667694 89.160431 350.916016 82.912109 L 413.142578 20.685547 C 416.191498 17.636597 420.16452 16.077301 424.160156 16.003906 C 424.258728 16.002106 424.356476 16 424.455078 16 C 424.583038 16 424.711914 16.000854 424.839844 16.003906 C 428.835449 16.077301 432.808472 17.636597 435.857422 20.685547 L 498.083984 82.912109 C 504.332336 89.160431 504.332336 99.290741 498.083984 105.539063 L 486.769531 116.853516 C 480.521179 123.101837 470.390869 123.101837 464.142578 116.853516 L 448 100.710938 L 448 479.769531 C 448 488.606018 440.836456 495.769531 432 495.769531 L 416 495.769531 Z M 184 424 C 91.21653 424 16 348.783447 16 256 C 16 163.216522 91.21653 88 184 88 C 276.783478 88 352 163.216522 352 256 C 352 348.783447 276.783478 424 184 424 Z M 184 376 C 250.273926 376 304 322.273926 304 256 C 304 193.94989 256.903809 142.899689 196.507813 136.644531 C 203.149612 138.591034 208 144.72876 208 152 L 208 232 L 264 232 C 272.836487 232 280 239.163513 280 248 L 280 264 C 280 272.836426 272.836487 280 264 280 L 192 280 L 176 280 C 169.924927 280 164.641083 276.614563 161.931641 271.626953 C 161.870056 271.513611 161.808899 271.398193 161.75 271.283203 C 160.630951 269.09845 160 266.623352 160 264 L 160 248 L 160 152 C 160 144.72876 164.850403 138.591034 171.492188 136.644531 C 111.096207 142.899689 64 193.94989 64 256 C 64 322.273926 117.726105 376 184 376 Z"
            />
        </svg>
    );
};