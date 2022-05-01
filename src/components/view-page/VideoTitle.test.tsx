import { isProhibitedFileBase } from './VideoTitle';

describe('isProhibitedFileBase', () => {
    it('works', () => {
        expect(isProhibitedFileBase('aaa')).toBe(false);
        expect(isProhibitedFileBase('あいう')).toBe(false);
        expect(isProhibitedFileBase('dummy \\ dummy')).toBe(true);
        expect(isProhibitedFileBase('dummy / dummy')).toBe(true);
        expect(isProhibitedFileBase('dummy : dummy')).toBe(true);
        expect(isProhibitedFileBase('dummy * dummy')).toBe(true);
        expect(isProhibitedFileBase('dummy > dummy')).toBe(true);
        expect(isProhibitedFileBase('dummy " dummy')).toBe(true);
        expect(isProhibitedFileBase('dummy < dummy')).toBe(true);
        expect(isProhibitedFileBase('dummy > dummy')).toBe(true);
        expect(isProhibitedFileBase('dummy | dummy')).toBe(true);
    });
});
