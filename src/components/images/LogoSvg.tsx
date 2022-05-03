import React from 'react';

type SvgProps = React.SVGAttributes<HTMLOrSVGElement>;

export const LogoSvg: React.FC<SvgProps> = (props) => {
    return (
        <svg viewBox="0 0 2560 512" xmlns="http://www.w3.org/2000/svg" version="1.1" {...props}>
            <path
                d="M122 496 C113.163 496 106 488.836 106 480 L106 269.117 C80.969 269.117 21.347 269.117 21.347 269.117 14.02 261.79 14.02 249.911 21.347 242.584 L242.734 21.197 C250.061 13.87 261.94 13.87 269.267 21.197 L490.654 242.584 C497.981 249.911 497.981 261.79 490.654 269.117 490.654 269.117 430.559 269.117 405 269.117 L405 480 C405 488.836 397.836 496 389 496 L122 496 Z"
                fill="#f90"
            />
            <path d="M354 301 L184 203 184 399 Z" fill="#fff" />
            <path
                d="M1960.384 496 L1959.384 438.531 C1958.814 439.602 1957.388 442.814 1955.107 448.168 1952.826 453.522 1950.118 458.235 1946.982 462.305 1937.431 475.155 1928.202 483.935 1919.292 488.646 1910.383 493.358 1899.942 495.715 1887.968 495.715 1853.471 495.715 1830.235 477.083 1818.261 439.816 1811.561 419.256 1808.212 388.951 1808.212 348.9 L1808.212 137.832 1870.648 137.832 1870.648 348.9 C1870.648 368.819 1872.217 383.809 1875.353 393.875 1880.912 411.651 1891.817 420.541 1908.068 420.541 1928.88 420.541 1943.134 407.903 1950.831 382.631 1954.823 368.924 1956.818 350.828 1956.818 328.34 L1956.818 137.832 2018.613 137.832 2019.613 496 1960.384 496 Z M1706.443 495.715 L1706.443 100.943 1611.72 100.943 1611.72 16 1867.025 16 1867.025 100.943 1772.728 100.943 1772.728 495.715 1706.443 495.715 Z M2184.537 495.715 C2165.292 495.715 2149.825 489.963 2138.136 478.457 2131.151 471.639 2123.595 459.707 2115.47 442.662 L2115.47 495.441 2055.814 495.441 2055.814 16 2116.541 16 2116.541 183.469 C2124.238 167.276 2132.72 154.919 2141.986 146.396 2152.962 135.743 2166.931 130.416 2183.894 130.416 2214.542 130.416 2238.525 146.928 2255.845 179.953 2273.165 212.978 2281.826 255.592 2281.826 307.793 2281.826 361.911 2273.271 406.76 2256.166 442.342 2239.06 477.924 2215.184 495.715 2184.537 495.715 Z M2419.527 495.715 C2389.876 495.715 2363.719 481.519 2341.054 453.127 2318.389 424.735 2307.056 378.545 2307.056 314.557 2307.056 254.594 2317.284 208.617 2337.74 176.623 2358.196 144.629 2384.744 128.631 2417.388 128.631 2436.775 128.631 2454.237 134.034 2469.775 144.84 2485.313 155.646 2498.142 172.703 2508.263 196.01 2517.386 216.562 2523.301 240.399 2526.009 267.52 2527.577 283.411 2528.22 306.293 2527.935 336.168 L2368.423 336.168 C2369.279 370.917 2376.62 395.283 2390.447 409.268 2398.857 417.955 2408.978 422.299 2420.81 422.299 2433.354 422.299 2443.546 417 2451.386 406.406 2455.663 400.685 2459.44 392.741 2462.718 382.57 L2524.941 382.57 C2523.373 403.123 2516.174 423.994 2503.345 445.182 2483.388 478.871 2455.449 495.715 2419.527 495.715 Z M1563.65 494.715 C1534 494.715 1507.842 480.559 1485.177 452.244 1462.512 423.929 1451.179 377.865 1451.179 314.051 1451.179 254.252 1461.407 208.399 1481.863 176.492 1502.318 144.585 1528.867 128.631 1561.511 128.631 1580.898 128.631 1598.36 134.02 1613.898 144.797 1629.436 155.573 1642.265 172.583 1652.386 195.826 1661.509 216.323 1667.424 240.094 1670.132 267.141 1671.7 282.988 1672.343 305.81 1672.058 335.604 L1512.546 335.604 C1513.402 370.258 1520.742 394.558 1534.57 408.504 1542.98 417.167 1553.099 421.498 1564.931 421.498 1577.475 421.498 1587.669 416.216 1595.509 405.65 1599.786 399.945 1603.563 392.022 1606.841 381.879 L1669.064 381.879 C1667.496 402.375 1660.297 423.19 1647.468 444.32 1627.511 477.918 1599.572 494.715 1563.65 494.715 Z M2168.285 420.609 C2183.965 420.609 2196.154 411.129 2204.849 392.166 2213.545 373.203 2217.892 348.273 2217.892 317.379 2217.892 292.663 2215.754 272.211 2211.478 256.018 2203.353 225.336 2188.384 209.996 2166.574 209.996 2144.479 209.996 2129.299 225.016 2121.031 255.059 2116.754 271.039 2114.617 291.706 2114.617 317.061 2114.617 346.89 2119.035 371.605 2127.873 391.207 2136.711 410.809 2150.181 420.609 2168.285 420.609 Z M2369.919 276.418 L2464.642 276.418 C2463.644 252.475 2458.762 234.307 2449.996 221.912 2441.229 209.517 2430.36 203.32 2417.388 203.32 2403.276 203.32 2392.334 209.887 2384.566 223.023 2376.797 236.16 2371.915 253.958 2369.919 276.418 Z M1514.042 276.016 L1608.765 276.016 C1607.767 252.138 1602.885 234.02 1594.119 221.658 1585.352 209.297 1574.483 203.115 1561.511 203.115 1547.399 203.115 1536.458 209.667 1528.689 222.768 1520.92 235.869 1516.038 253.617 1514.042 276.016 Z M1344.957 130.218 C1355.221 130.218 1365.341 133.28 1375.32 139.405 1385.298 145.529 1394.35 156.247 1402.475 171.558 1409.033 184.025 1413.452 199.336 1415.732 217.491 1417.158 229.521 1417.871 247.129 1417.871 270.314 L1417.443 495.715 1355.007 495.715 1355.007 268.017 C1355.007 254.456 1353.581 243.301 1350.73 234.552 1345.313 217.928 1335.335 209.617 1320.795 209.617 1303.974 209.617 1292.357 220.334 1285.942 241.77 1282.664 253.144 1281.024 266.814 1281.024 282.782 L1281.024 495.715 1219.657 495.715 1219.657 282.782 C1219.657 261.565 1218.232 246.145 1215.381 236.52 1210.249 219.241 1200.199 210.601 1185.232 210.601 1167.841 210.601 1156.152 219.241 1150.165 236.52 1146.886 246.363 1145.247 261.018 1145.247 280.485 L1145.247 495.715 1083.452 495.715 1083.452 138.748 1142.681 138.748 1142.681 190.915 C1150.236 172.323 1157.364 159.09 1164.063 151.216 1175.895 137.217 1191.219 130.218 1210.035 130.218 1227.854 130.218 1242.251 136.233 1253.227 148.263 1262.065 159.418 1268.765 173.745 1273.327 191.243 1281.309 170.245 1291.216 154.825 1303.048 144.982 1315.592 135.139 1329.562 130.218 1344.957 130.218 Z M928.076 419.887 C945.895 419.887 959.579 410.475 969.13 391.65 978.681 372.825 983.456 346.069 983.456 311.38 983.456 276.691 978.681 249.988 969.13 231.269 959.579 212.55 945.895 203.19 928.076 203.19 910.257 203.19 896.537 212.55 886.915 231.269 877.293 249.988 872.482 276.691 872.482 311.38 872.482 346.069 877.293 372.825 886.915 391.65 896.537 410.475 910.257 419.887 928.076 419.887 Z M1047.389 311.38 C1047.389 362.144 1037.553 405.557 1017.881 441.62 998.21 477.684 968.346 495.715 928.29 495.715 888.233 495.715 858.37 477.684 838.698 441.62 819.026 405.557 809.191 362.144 809.191 311.38 809.191 261.462 819.026 218.208 838.698 181.616 858.37 145.024 888.233 126.728 928.29 126.728 968.346 126.728 998.21 145.024 1017.881 181.616 1037.553 218.208 1047.389 261.462 1047.389 311.38 Z M522.576 494.716 L522.576 16 587.791 16 587.791 198.522 710.953 198.522 710.953 16 776.383 16 776.383 494.716 710.953 494.716 710.953 281.015 587.791 281.015 587.791 494.716 Z"
                fill="#333"
            />
        </svg>
    );
};
