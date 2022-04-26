import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import { ClassModifiedImg } from './ClassModifiedElements';
import { HTMLImgProps } from './types';

type ImgProps = HTMLImgProps & {
    rounded?: boolean;
};

export const FluidImg = forwardRef<HTMLImageElement, ImgProps>(({ rounded, ...rest }, ref) => {
    const classModifier = classNames('img-fluid');
    if (rounded) {
        classModifier.add('rounded');
    }
    return <ClassModifiedImg classModifier={classModifier.build()!} ref={ref} {...rest} />;
});
