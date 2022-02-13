import { formatFileSize } from './StringUtils';

describe('formatFileSize', () => {
    it.each([
        ['0 B', 0],
        ['1 B', 1],
        ['999 B', 999],
        ['1.0 KB', 1_000],
        ['1.0 KB', 1_099],
        ['1.1 KB', 1_100],
        ['1.9 KB', 1_999],
        ['2.0 KB', 2_000],
        ['999.9 KB', 999_999],
        ['1.0 MB', 1_000_000],
        ['1.0 GB', 1_000_000_000],
        ['1.0 TB', 1_000_000_000_000],
        ['1.0 PB', 1_000_000_000_000_000],
    ])('returns "%s" when %d is given', (expected, fileSize) => {
        expect(formatFileSize(fileSize)).toBe(expected);
    });
});
