import { THUMBNAIL } from '@otchy/home-tube-api/dist/const';
import React from 'react';

export const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise<HTMLImageElement>((resolve) => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.addEventListener('error', (error: ErrorEvent) => {
            console.error(error);
            resolve(new Image());
        });
        image.setAttribute('src', src);
    });
};

export const loadAllImages = (srcList: string[]): Promise<HTMLImageElement[]> => {
    return Promise.all(srcList.map((src) => loadImage(src)));
};

type GetThumbnailStyleProps = {
    src: string;
    sec: number;
    width: number;
    height: number;
    maxWidth: number;
    maxHeight: number;
};

const getImageSize = ({ width, height }: GetThumbnailStyleProps) => {
    if (width >= height) {
        return [THUMBNAIL.SIZE, height * (THUMBNAIL.SIZE / width)];
    } else {
        return [width * (THUMBNAIL.SIZE / height), THUMBNAIL.SIZE];
    }
};

export const getThumbnailStyle = (props: GetThumbnailStyleProps): React.CSSProperties => {
    const { src, sec, maxWidth, maxHeight } = props;
    const [imageWidth, imageHeight] = getImageSize(props);
    const scale = Math.min(maxWidth / imageWidth, maxHeight / imageHeight);
    const imageStyle: React.CSSProperties = {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        backgroundImage: `url(${src})`,
        backgroundPositionX: `${-sec * imageWidth}px`,
        transform: `scale(${scale})`,
    };
    return imageStyle;
};
