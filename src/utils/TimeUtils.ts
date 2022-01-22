export const formatTimeInSecond = (time: number | undefined): string => {
    if (time === undefined) {
        return 'undefined';
    }
    let current = Math.trunc(time);
    const sec = current % 60;
    current -= sec;
    current /= 60;
    const min = current % 60;
    current -= min;
    current /= 60;
    const hour = current;
    const hh = hour > 0 ? `${hour}:` : '';
    const mm = hour > 0 ? String(min).padStart(2, '0') : String(min);
    const ss = String(sec).padStart(2, '0');
    return `${hh}${mm}:${ss}`;
};
