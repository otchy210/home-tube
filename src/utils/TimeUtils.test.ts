import { formatTimeInSecond } from './TimeUtils';

describe('formatTimeInSecond', () => {
    it.each([
        [0, '0:00'],
        [0.99, '0:00'],
        [1, '0:01'],
        [59, '0:59'],
        [60, '1:00'],
        [60 * 59, '59:00'],
        [60 * 59 + 59, '59:59'],
        [60 * 60, '1:00:00'],
        [60 * 60 + 60 + 1, '1:01:01'],
        [60 * 60 + 60 * 59 + 59, '1:59:59'],
        [2 * 60 * 60, '2:00:00'],
    ])('works when input:%s, expected:%s', (input, expected) => {
        expect(formatTimeInSecond(input)).toBe(expected);
    });
});
