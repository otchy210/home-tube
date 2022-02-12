export const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.addEventListener('error', (error: ErrorEvent) => {
            reject(error);
        });
        image.setAttribute('src', src);
    });
};

export const loadAllImages = (srcList: string[]): Promise<HTMLImageElement[]> => {
    return Promise.all(srcList.map((src) => loadImage(src)));
};
