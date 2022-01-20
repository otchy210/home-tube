import { parse } from 'bowser';

const browserInfo = parse(window.navigator.userAgent);

export const useBrowserInfo = (): Bowser.Parser.ParsedResult => {
    return browserInfo;
};
