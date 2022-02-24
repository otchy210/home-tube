export const classNames = (...classes: (string | undefined)[]) => {
    return classes.filter((className) => className && className.trim().length > 0).join(' ');
};
