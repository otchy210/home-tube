export const formatFileSize = (fileSize: number): string => {
    return ['', 'K', 'M', 'G', 'T', 'P']
        .map((prefix, index) => {
            const exp = index * 3;
            return { prefix, exp };
        })
        .filter(({ exp }) => {
            return fileSize < 10 ** (exp + 3);
        })
        .reduce((prev, { prefix, exp }) => {
            if (prev !== '') {
                return prev;
            }
            if (prefix === '') {
                return `${fileSize} B`;
            }
            const num = fileSize / 10 ** (exp - 1);
            const str = String(Math.trunc(num));
            const intPart = str.slice(0, -1);
            const floatPart = str.slice(-1);
            return `${intPart}.${floatPart} ${prefix}B`;
        }, '');
};

export const formatTime = (time: number): string => {
    const date = new Date(time);
    const year = date.getFullYear();
    const mon = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const sec = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${mon}-${day} ${hour}:${min}:${sec}`;
};
