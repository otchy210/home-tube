import TimeSizeLimitedCache from './TimeSizeLimitedCache';
import { now } from './DateUtils';

jest.mock('./DateUtils');

describe('TimeSizeLimitedCache', () => {
    const mockedNow = now as jest.Mock;

    beforeEach(() => {
        mockedNow.mockReturnValue(0);
    });

    it('add / removes items correctly', () => {
        const cache = new TimeSizeLimitedCache<number, string>(1000, 10);

        cache.add(1, 'a');
        cache.add(2, 'b');
        cache.add(3, 'c');
        expect(cache.get(1)).toBe('a');
        expect(cache.get(2)).toBe('b');
        expect(cache.get(3)).toBe('c');
        expect(cache.size()).toBe(3);

        cache.remove(2);
        expect(cache.get(1)).toBe('a');
        expect(cache.get(2)).toBeNull();
        expect(cache.get(3)).toBe('c');
        expect(cache.size()).toBe(2);

        cache.remove(1);
        cache.remove(3);
        expect(cache.size()).toBe(0);
    });

    it('overrides existing item correctly', () => {
        const cache = new TimeSizeLimitedCache<number, string>(1000, 10);

        cache.add(1, 'a');
        cache.add(2, 'b');
        cache.add(1, 'c');
        expect(cache.get(1)).toBe('c');
        expect(cache.size()).toBe(2);
    });

    it('truncates items from oldest', () => {
        const cache = new TimeSizeLimitedCache<number, string>(1000, 2);

        cache.add(1, 'a');
        cache.add(2, 'b');
        cache.add(3, 'c');
        expect(cache.get(1)).toBeNull();
        expect(cache.get(2)).toBe('b');
        expect(cache.get(3)).toBe('c');
        expect(cache.size()).toBe(2);

        cache.add(4, 'd');
        expect(cache.get(2)).toBeNull();
        expect(cache.size()).toBe(2);
    });

    it('expires items correctly', () => {
        const cache = new TimeSizeLimitedCache<number, string>(10, 10);
        mockedNow.mockReturnValue(0);
        cache.add(1, 'a');
        mockedNow.mockReturnValue(5);
        cache.add(2, 'b');
        mockedNow.mockReturnValue(10);
        cache.add(3, 'c');

        mockedNow.mockReturnValue(11);
        expect(cache.get(1)).toBeNull();
        expect(cache.get(2)).toBe('b');
        expect(cache.get(3)).toBe('c');

        mockedNow.mockReturnValue(15);
        expect(cache.get(1)).toBeNull();
        expect(cache.get(2)).toBe('b');
        expect(cache.get(3)).toBe('c');

        mockedNow.mockReturnValue(16);
        expect(cache.get(2)).toBeNull();
        expect(cache.get(3)).toBe('c');

        mockedNow.mockReturnValue(20);
        expect(cache.get(3)).toBe('c');

        mockedNow.mockReturnValue(21);
        expect(cache.get(3)).toBeNull();
    });
});
