import React from 'react';

type SvgProps = React.SVGAttributes<HTMLOrSVGElement>;

export const ForwardSvg: React.FC<SvgProps> = (props) => {
    return (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fill="#fff"
                d="M 255.529297 497 C 135.195297 497 37.644531 399.449219 37.644531 279.115234 C 37.644531 158.781311 135.195297 61.230469 255.529297 61.230469 L 367.238281 61.230469 C 367.238373 57.266754 367.238037 51.709625 367.238281 48.244141 C 367.240997 8.141174 367.238892 8.130432 393.857422 28.105469 C 406.584106 37.655792 425.660889 51.977783 441.574219 63.898438 C 473.426727 87.759064 473.437103 87.766083 441.689453 111.572266 C 425.837067 123.45932 406.820313 137.725647 394.132813 147.236328 C 367.230682 167.402405 367.234985 167.413879 367.236328 127.132813 C 367.236481 122.861359 367.236267 118.799103 367.236328 114.318359 L 255.529297 114.318359 C 164.515274 114.318359 90.734375 188.101288 90.734375 279.115234 C 90.734375 370.129272 164.515274 443.912109 255.529297 443.912109 C 346.543243 443.912109 420.326172 370.129272 420.326172 279.115234 L 420.363281 279.115234 C 420.934265 269.857239 428.621674 262.525391 438.023438 262.525391 L 455.71875 262.525391 C 465.120483 262.525391 472.807892 269.857239 473.378906 279.115234 L 473.416016 279.115234 C 473.416016 399.449219 375.86322 497 255.529297 497 Z"
            />
            <path
                fill="#fff"
                d="M 325.638824 185.992554 C 336.733887 185.992554 346.189789 188.472107 354.006775 193.431274 C 361.823761 198.390442 368.169708 205.030579 373.04483 213.351898 C 377.919952 221.673187 381.450134 231.297211 383.635529 242.224182 C 385.820923 253.151154 386.913605 264.666321 386.913605 276.77002 C 386.913605 288.873779 385.652832 300.388916 383.131226 311.315918 C 380.609619 322.242889 376.82724 331.82486 371.784027 340.062134 C 366.740814 348.299377 360.352844 354.855469 352.619904 359.73056 C 344.886963 364.605652 335.809326 367.043213 325.386658 367.043213 C 314.96402 367.043213 305.928375 364.647705 298.27951 359.856628 C 290.630615 355.065582 284.284668 348.593567 279.241455 340.440369 C 274.198242 332.28717 270.457886 322.789246 268.020355 311.946289 C 265.582794 301.103394 264.364014 289.630249 264.364014 277.52652 C 264.364014 265.422791 265.498749 253.823578 267.768188 242.728485 C 270.037628 231.633423 273.609863 221.883331 278.484955 213.477966 C 283.360077 205.072601 289.706024 198.390442 297.52301 193.431274 C 305.339996 188.472107 314.711853 185.992554 325.638824 185.992554 Z M 325.638824 335.271057 C 331.01825 335.271057 335.599121 333.548004 339.381531 330.101807 C 343.16394 326.655609 346.189819 322.158813 348.459259 316.611267 C 350.728729 311.063721 352.367737 304.843842 353.376373 297.951447 C 354.38504 291.059052 354.889343 284.082703 354.889343 277.022217 C 354.889343 269.793579 354.38504 262.439026 353.376373 254.958221 C 352.367737 247.477448 350.686676 240.711243 348.333191 234.659393 C 345.979675 228.607513 342.953796 223.69046 339.255432 219.908051 C 335.557068 216.125641 331.01825 214.234436 325.638824 214.234436 C 320.259399 214.234436 315.720551 216.125641 312.022186 219.908051 C 308.323853 223.69046 305.297943 228.607513 302.944458 234.659393 C 300.590942 240.711243 298.867889 247.477448 297.775177 254.958221 C 296.682495 262.439026 296.136139 269.96167 296.136139 277.52652 C 296.136139 284.587036 296.640442 291.605408 297.649109 298.581848 C 298.657745 305.558289 300.338806 311.736145 302.692291 317.115601 C 305.045807 322.494995 308.071686 326.865723 311.77005 330.227905 C 315.468414 333.590027 320.091278 335.271057 325.638824 335.271057 Z M 199.811157 272.231171 C 204.85437 272.567383 209.855499 273.74411 214.814651 275.761414 C 219.773819 277.778687 224.186569 280.552429 228.05304 284.082672 C 231.91951 287.612915 235.071472 291.94162 237.509018 297.068909 C 239.946579 302.196167 241.165344 308.037781 241.165344 314.593994 C 241.165344 322.663147 239.73645 329.933655 236.878632 336.405792 C 234.020798 342.87793 230.070343 348.383362 225.027115 352.922241 C 219.983902 357.461151 213.932129 360.949341 206.871628 363.386871 C 199.811127 365.824432 192.078308 367.043213 183.672943 367.043213 C 173.922714 367.043213 165.559509 365.404175 158.583054 362.126099 C 151.606598 358.847992 145.891037 354.813477 141.436203 350.0224 C 136.981354 345.231354 133.745346 340.146179 131.728058 334.766754 C 129.71077 329.387329 128.786194 324.512268 128.9543 320.141479 C 129.122406 315.770691 130.635345 312.324585 133.493164 309.802948 C 136.350998 307.281342 139.713089 306.020569 143.579559 306.020569 C 145.092529 306.020569 146.689514 306.230682 148.37059 306.65094 C 150.051666 307.071228 151.648651 307.785675 153.161621 308.794312 C 154.674591 309.802979 155.977402 311.105774 157.070099 312.702789 C 158.162796 314.299805 158.793182 316.35907 158.961288 318.880707 C 159.12941 320.89801 159.717773 323.125366 160.72641 325.562927 C 161.735062 328.000488 163.248001 330.269897 165.265289 332.371246 C 167.282578 334.472595 169.930222 336.237671 173.208313 337.666595 C 176.486404 339.09552 180.478897 339.809937 185.185898 339.809937 C 188.716156 339.809937 192.036224 339.09552 195.14621 337.666595 C 198.256195 336.237671 200.945862 334.346497 203.215317 331.992981 C 205.484756 329.639496 207.249863 326.82373 208.510666 323.545654 C 209.771469 320.267578 210.401855 316.863434 210.401855 313.333191 C 210.401855 308.962402 209.47728 305.180054 207.628113 301.986023 C 205.778931 298.791962 203.341415 296.18634 200.315475 294.169067 C 197.289551 292.151764 193.885422 290.680847 190.103012 289.756256 C 186.320602 288.831665 182.412155 288.369385 178.377594 288.369385 C 174.511124 288.369385 170.980927 287.024536 167.78688 284.334839 C 164.59285 281.645111 162.99585 277.610596 162.99585 272.231171 C 162.99585 268.028503 164.340683 264.582336 167.030411 261.892639 C 169.720123 259.202911 173.166275 257.858063 177.368942 257.858063 C 180.394882 257.858063 183.378738 257.185669 186.320618 255.84079 C 189.262497 254.495941 191.868118 252.688812 194.137573 250.419342 C 196.407013 248.149902 198.214142 245.544281 199.559006 242.602417 C 200.903854 239.660522 201.576279 236.676666 201.576279 233.650726 C 201.576279 227.262665 199.601044 222.009399 195.650528 217.890778 C 191.699997 213.772125 187.287247 211.71286 182.41214 211.71286 C 176.360275 211.71286 171.56929 213.772125 168.039047 217.890778 C 164.508789 222.009399 162.743683 227.010498 162.743683 232.894257 C 162.743683 236.256409 161.440872 239.156219 158.83522 241.593781 C 156.229553 244.031311 152.237061 245.250092 146.857635 245.250092 C 143.327377 245.250092 140.343521 243.905243 137.90596 241.215515 C 135.468414 238.525818 134.249649 234.995605 134.249649 230.624817 C 134.249649 223.900543 135.510437 217.806732 138.032043 212.343262 C 140.55365 206.879761 144.041824 202.172821 148.496674 198.222321 C 152.951508 194.27179 158.120728 191.245911 164.004486 189.144562 C 169.888245 187.043213 176.192169 185.992554 182.916458 185.992554 C 189.472641 185.992554 195.69252 186.833099 201.576279 188.51416 C 207.460037 190.195251 212.67128 192.800873 217.210175 196.331116 C 221.749069 199.861359 225.321289 204.358154 227.926956 209.821655 C 230.532623 215.285126 231.835434 221.715149 231.835434 229.111877 C 231.835434 234.995636 230.952881 240.206879 229.187759 244.745758 C 227.422623 249.284668 225.111191 253.319183 222.253372 256.849426 C 219.395538 260.3797 215.991425 263.405579 212.040894 265.927185 C 208.090378 268.448792 204.01384 270.55011 199.811157 272.231171 Z"
            />
        </svg>
    );
};