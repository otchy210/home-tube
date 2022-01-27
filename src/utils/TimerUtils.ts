export const waitFor = (msec: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, msec);
    });
};
