export const partiallyPreventDefault = (func: () => void): ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.metaKey || e.ctrlKey) {
            return;
        }
        e.preventDefault();
        func();
    };
};
