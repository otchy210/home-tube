import React from 'react';

type SvgProps = React.SVGAttributes<HTMLOrSVGElement>;

export const NameDescSvg: React.FC<SvgProps> = (props) => {
    return (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fill="#fff"
                d="M 65.885567 248.069275 C 63.180233 248.064545 60.439545 247.372528 57.928532 245.922791 L 44.07111 237.922791 C 36.418507 233.504578 33.797405 223.71994 38.215641 216.067322 L 142.215637 35.932556 C 145.443893 30.341064 151.537659 27.437103 157.571106 28.000916 L 172.428528 28.000916 C 178.46199 27.437103 184.55574 30.341064 187.783997 35.932556 L 291.783997 216.067322 C 296.20224 223.71994 293.581116 233.504578 285.928528 237.922791 L 272.071106 245.922791 C 264.418518 250.341034 254.633881 247.71994 250.215637 240.067322 L 224.545715 195.606384 C 223.405396 195.864349 222.219101 196.000916 221.000793 196.000916 L 105.22541 196.000916 L 79.784004 240.067322 C 76.815498 245.208923 71.425049 248.078979 65.885567 248.069275 Z M 132.938293 148.000916 L 197.06134 148.000916 L 165.000793 92.467712 L 132.938293 148.000916 Z M 60.998932 484 C 60.171188 483.999908 59.357246 483.937714 58.563385 483.816406 C 58.166142 483.755707 57.772713 483.679199 57.385651 483.589844 C 57.128235 483.530396 56.87252 483.464294 56.620026 483.392578 C 56.493473 483.356628 56.366371 483.320221 56.241119 483.28125 C 54.864014 482.852753 53.565594 482.241272 52.375885 481.478516 C 52.159481 481.339783 51.946327 481.19754 51.737213 481.048828 C 51.423992 480.82605 51.119076 480.589935 50.823151 480.345703 C 50.526821 480.101135 50.237724 479.846954 49.959869 479.582031 C 49.867596 479.494049 49.776585 479.404602 49.686432 479.314453 C 49.505466 479.133484 49.329304 478.947235 49.157135 478.757813 C 48.726715 478.284241 48.32383 477.784515 47.952057 477.261719 C 47.803349 477.052612 47.659157 476.839447 47.520416 476.623047 C 47.381676 476.406647 47.248459 476.188202 47.120026 475.964844 C 46.991589 475.741486 46.868679 475.513184 46.750885 475.283203 C 46.633091 475.053223 46.519814 474.820251 46.412994 474.583984 C 46.306175 474.347717 46.205769 474.109406 46.11026 473.867188 C 46.014751 473.624969 45.924591 473.378693 45.840729 473.130859 C 45.798798 473.006958 45.758591 472.883057 45.719635 472.757813 C 45.563805 472.256805 45.431671 471.745392 45.325104 471.224609 C 45.27182 470.964233 45.224945 470.702332 45.184479 470.4375 C 45.144012 470.172668 45.110229 469.90564 45.082916 469.636719 C 45.055603 469.367798 45.034241 469.096924 45.020416 468.824219 C 45.013504 468.687866 45.008266 468.549347 45.004791 468.412109 C 45.001312 468.274872 45.000885 468.138062 45.000885 468 L 45.000885 456.044922 C 44.99342 456.034119 44.986843 456.022522 44.979401 456.011719 C 44.966896 448.673401 44.953068 439.946899 44.948151 433.912109 C 44.935097 417.890778 44.951092 417.597687 57.799713 410.179688 C 58.018394 410.053436 58.210232 409.94104 58.436432 409.810547 C 59.604877 409.136414 61.381344 408.110535 62.598541 407.408203 C 114.24527 377.608185 201.278259 327.344727 213.217682 320.449219 C 214.042389 319.9729 220.920807 316 220.920807 316 L 60.998932 316 C 60.171188 315.999908 59.357246 315.937714 58.563385 315.816406 C 58.166142 315.755707 57.772713 315.679199 57.385651 315.589844 C 57.128235 315.530396 56.87252 315.464294 56.620026 315.392578 C 56.493473 315.356628 56.366371 315.32019 56.241119 315.28125 C 54.864014 314.852722 53.565594 314.241272 52.375885 313.478516 C 52.159481 313.339783 51.946327 313.19754 51.737213 313.048828 C 51.423992 312.82605 51.119076 312.589905 50.823151 312.345703 C 50.526821 312.101135 50.237724 311.846924 49.959869 311.582031 C 49.867596 311.494019 49.776585 311.404602 49.686432 311.314453 C 49.505466 311.133484 49.329304 310.947235 49.157135 310.757813 C 48.726715 310.284241 48.32383 309.784485 47.952057 309.261719 C 47.803349 309.052612 47.659157 308.839447 47.520416 308.623047 C 47.381676 308.406647 47.248459 308.188202 47.120026 307.964844 C 46.991589 307.741486 46.868679 307.513184 46.750885 307.283203 C 46.633091 307.053223 46.519814 306.820251 46.412994 306.583984 C 46.306175 306.347717 46.205769 306.109375 46.11026 305.867188 C 46.014751 305.625 45.924591 305.378662 45.840729 305.130859 C 45.798798 305.006958 45.758591 304.883057 45.719635 304.757813 C 45.563805 304.256805 45.431671 303.745392 45.325104 303.224609 C 45.27182 302.964233 45.224945 302.702332 45.184479 302.4375 C 45.144012 302.172668 45.110229 301.90564 45.082916 301.636719 C 45.055603 301.367798 45.034241 301.096924 45.020416 300.824219 C 45.013504 300.687866 45.008266 300.549347 45.004791 300.412109 C 45.001312 300.274872 45.000885 300.138062 45.000885 300 L 45.000885 284 C 45.000885 283.861938 45.001312 283.725128 45.004791 283.587891 C 45.008266 283.450653 45.013504 283.312134 45.020416 283.175781 C 45.034241 282.903076 45.055603 282.632202 45.082916 282.363281 C 45.110229 282.09436 45.144012 281.827332 45.184479 281.5625 C 45.224945 281.297668 45.27182 281.035767 45.325104 280.775391 C 45.431671 280.254608 45.563805 279.743195 45.719635 279.242188 C 45.758591 279.116943 45.798798 278.993042 45.840729 278.869141 C 45.924591 278.621338 46.014751 278.375 46.11026 278.132813 C 46.205769 277.890625 46.306175 277.652283 46.412994 277.416016 C 46.519814 277.179749 46.633091 276.946777 46.750885 276.716797 C 46.868679 276.486816 46.991589 276.258514 47.120026 276.035156 C 47.248459 275.811798 47.381676 275.593353 47.520416 275.376953 C 47.659157 275.160553 47.803349 274.947388 47.952057 274.738281 C 48.32383 274.215515 48.726715 273.715759 49.157135 273.242188 C 49.329304 273.052765 49.505466 272.866516 49.686432 272.685547 C 49.776913 272.595062 49.867249 272.506287 49.959869 272.417969 C 49.960205 272.417664 49.961483 272.418274 49.961823 272.417969 C 50.054104 272.330017 50.146759 272.242004 50.241119 272.15625 C 50.24147 272.155945 50.242718 272.156555 50.243073 272.15625 C 50.337433 272.070496 50.431831 271.98584 50.528229 271.902344 C 50.818871 271.650513 51.118256 271.408386 51.426666 271.177734 C 51.529339 271.100952 51.632656 271.025513 51.737213 270.951172 C 51.73764 270.950867 51.738735 270.951477 51.739166 270.951172 C 51.843292 270.877136 51.947662 270.804016 52.053619 270.732422 C 53.224388 269.941284 54.504536 269.30127 55.868073 268.839844 C 55.991982 268.797913 56.115868 268.75769 56.241119 268.71875 C 56.492199 268.640625 56.744667 268.569824 57.000885 268.503906 C 57.128689 268.471008 57.25663 268.439941 57.385651 268.410156 C 57.386265 268.410034 57.386986 268.410278 57.387604 268.410156 C 57.51601 268.380524 57.644753 268.350739 57.774323 268.324219 C 57.774944 268.324097 57.77565 268.324341 57.776276 268.324219 C 57.905849 268.297729 58.036205 268.273346 58.166901 268.25 C 58.955448 268.109039 59.762772 268.026733 60.586823 268.005859 C 60.724052 268.00238 60.860863 268 60.998932 268 C 60.99958 268 61.000233 268 61.000885 268 L 252.998932 268 L 253.000885 268 L 268.998932 268 C 273.417145 268 277.417938 269.7901 280.313385 272.685547 C 280.584839 272.957001 280.847076 273.239014 281.098541 273.529297 C 281.433807 273.916382 281.750336 274.320068 282.04776 274.738281 C 282.196472 274.947388 282.340668 275.160553 282.479401 275.376953 C 282.618134 275.593353 282.751343 275.811798 282.879791 276.035156 C 282.944 276.146851 283.00766 276.259705 283.069244 276.373047 C 283.192383 276.599762 283.310394 276.829346 283.42276 277.0625 C 283.535095 277.295654 283.641846 277.532227 283.743073 277.771484 C 283.894867 278.130402 284.033295 278.497406 284.159088 278.869141 C 284.24295 279.116943 284.321564 279.366028 284.393463 279.619141 C 284.465332 279.872253 284.531158 280.128662 284.590729 280.386719 C 284.620514 280.515747 284.648071 280.645203 284.674713 280.775391 C 284.727997 281.035767 284.774872 281.297668 284.815338 281.5625 C 284.855804 281.827332 284.889587 282.09436 284.916901 282.363281 C 284.944214 282.632202 284.965576 282.903076 284.979401 283.175781 C 284.986298 283.312134 284.991547 283.450653 284.995026 283.587891 C 284.998505 283.725128 284.998932 283.861938 284.998932 284 L 284.998932 295.955078 C 285.006378 295.965881 285.01297 295.977478 285.020416 295.988281 C 285.032898 303.326599 285.048706 312.053101 285.053619 318.087891 C 285.066071 333.363525 285.079742 334.326416 273.944244 340.8125 C 273.495483 341.073914 272.990509 341.363892 272.504791 341.644531 L 271.563385 342.189453 C 270.259369 342.941803 268.283356 344.083771 266.918854 344.871094 C 215.182938 374.722839 128.688904 424.674133 116.782135 431.550781 L 109.07901 436 L 268.998932 436 C 269.136993 436 269.275757 436.00238 269.412994 436.005859 C 270.235718 436.026703 271.04361 436.109436 271.830963 436.25 C 272.224945 436.320374 272.615509 436.405243 272.998932 436.503906 C 273.253937 436.569519 273.506805 436.641052 273.756744 436.71875 C 273.881989 436.75769 274.007813 436.797913 274.131744 436.839844 C 274.378967 436.923523 274.624451 437.014099 274.866119 437.109375 C 274.987213 437.157135 275.107788 437.207214 275.227448 437.257813 C 275.705475 437.459991 276.172943 437.685638 276.625885 437.931641 C 276.739227 437.993225 276.852081 438.054932 276.963776 438.119141 C 277.074951 438.183075 277.18631 438.249878 277.295807 438.316406 C 277.405762 438.383209 277.515717 438.452118 277.623932 438.521484 C 278.16452 438.868042 278.683136 439.24707 279.176666 439.654297 C 279.571777 439.980377 279.951447 440.323608 280.313385 440.685547 C 280.584839 440.957001 280.847076 441.239014 281.098541 441.529297 C 281.433807 441.916351 281.750336 442.320038 282.04776 442.738281 C 282.196472 442.947388 282.340668 443.160553 282.479401 443.376953 C 282.618134 443.593353 282.751343 443.811798 282.879791 444.035156 C 282.944 444.146851 283.00766 444.259705 283.069244 444.373047 C 283.192383 444.599762 283.310394 444.829346 283.42276 445.0625 C 283.535095 445.295654 283.641846 445.532196 283.743073 445.771484 C 283.894867 446.130402 284.033295 446.497406 284.159088 446.869141 C 284.24295 447.116943 284.321564 447.366028 284.393463 447.619141 C 284.465332 447.872253 284.531158 448.128662 284.590729 448.386719 C 284.620514 448.515747 284.648071 448.645203 284.674713 448.775391 C 284.727997 449.035767 284.774872 449.297668 284.815338 449.5625 C 284.855804 449.827332 284.889587 450.09436 284.916901 450.363281 C 284.944214 450.632202 284.965576 450.903076 284.979401 451.175781 C 284.986298 451.312134 284.991547 451.450653 284.995026 451.587891 C 284.998505 451.725128 284.998932 451.861938 284.998932 452 L 284.998932 468 C 284.998932 468.138062 284.998505 468.274872 284.995026 468.412109 C 284.991547 468.549347 284.986298 468.687866 284.979401 468.824219 C 284.965576 469.096924 284.944214 469.367798 284.916901 469.636719 C 284.889587 469.90564 284.855804 470.172668 284.815338 470.4375 C 284.774872 470.702332 284.727997 470.964233 284.674713 471.224609 C 284.648071 471.354797 284.620514 471.484253 284.590729 471.613281 C 284.531158 471.871338 284.465332 472.127747 284.393463 472.380859 C 284.321564 472.633972 284.24295 472.883026 284.159088 473.130859 C 284.033295 473.502594 283.894867 473.869598 283.743073 474.228516 C 283.641846 474.467804 283.535095 474.704346 283.42276 474.9375 C 283.310394 475.170654 283.192383 475.400238 283.069244 475.626953 C 283.00766 475.740295 282.944 475.853149 282.879791 475.964844 C 282.751343 476.188202 282.618134 476.406647 282.479401 476.623047 C 282.340668 476.839447 282.196472 477.052612 282.04776 477.261719 C 281.750336 477.679932 281.433807 478.083649 281.098541 478.470703 C 280.847076 478.760986 280.584839 479.042999 280.313385 479.314453 C 280.223236 479.404602 280.132202 479.494049 280.039948 479.582031 C 280.039581 479.582367 280.03833 479.581696 280.037994 479.582031 C 279.945709 479.670013 279.853058 479.757965 279.758698 479.84375 C 279.758331 479.844086 279.757111 479.843414 279.756744 479.84375 C 279.662384 479.929504 279.567963 480.01416 279.471588 480.097656 C 279.471191 480.097992 279.470001 480.097321 279.469635 480.097656 C 277.825073 481.522247 275.887268 482.618896 273.758698 483.28125 C 273.758087 483.281433 273.757324 483.281067 273.756744 483.28125 C 273.381592 483.397949 273.00058 483.50058 272.614166 483.589844 C 272.613525 483.589996 272.612823 483.589691 272.612213 483.589844 C 272.483795 483.619476 272.355042 483.649261 272.225494 483.675781 C 272.224854 483.675903 272.224152 483.675659 272.223541 483.675781 C 272.093964 483.702301 271.963593 483.726624 271.832916 483.75 C 271.832275 483.750122 271.831573 483.749878 271.830963 483.75 C 270.912292 483.914093 269.966675 483.999878 269.000885 484 L 268.998932 484 L 77.000885 484 L 76.998932 484 L 61.000885 484 L 60.998932 484 Z M 424.455109 16 C 424.356506 16 424.258759 16.002106 424.160187 16.003906 C 420.164551 16.077301 416.191528 17.636597 413.142609 20.685547 L 350.916046 82.912109 C 344.667725 89.160431 344.667725 99.290741 350.916046 105.539063 L 362.230499 116.853516 C 368.478821 123.101837 378.609131 123.101837 384.857452 116.853516 L 400.000031 101.710938 L 400.000031 479.769531 C 400.000031 488.606018 407.163544 495.769531 416.000031 495.769531 L 432.000031 495.769531 C 440.836487 495.769531 448.000031 488.606018 448.000031 479.769531 L 448.000031 100.710938 L 464.142609 116.853516 C 470.3909 123.101837 480.52121 123.101837 486.769562 116.853516 L 498.084015 105.539063 C 504.332367 99.290741 504.332367 89.160431 498.084015 82.912109 L 435.857452 20.685547 C 432.808502 17.636597 428.83548 16.077301 424.839874 16.003906 C 424.711945 16.000854 424.583069 16 424.455109 16 Z"
            />
        </svg>
    );
};
