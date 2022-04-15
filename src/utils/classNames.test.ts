import { classNames, Arg } from './classNames';

describe('classNames', () => {
    it('returns null when no valid values added', () => {
        expect(classNames().build()).toBeUndefined();
        expect(classNames().add().build()).toBeUndefined();
        expect(classNames().add(null, undefined, '', []).build()).toBeUndefined();
        expect(classNames(' ', '   ', [null, undefined, ' '], [[[]]]).build()).toBeUndefined();
    });

    it('returns single className when one valid value added', () => {
        expect(classNames('a').build()).toBe('a');
        expect(classNames('a').add('a').build()).toBe('a');
        expect(
            classNames('a')
                .add('  a  a  ')
                .add(['a', ['a', ['a']]])
                .build()
        ).toBe('a');
    });

    it('returns multiple unique sorted classNames when multiple valid values added', () => {
        expect(classNames('c', 'b', 'a').build()).toBe('a b c');
        expect(classNames('  c b     a   ').build()).toBe('a b c');
        expect(
            classNames()
                .add([['c']])
                .add('   b', null)
                .add([[[null, ['a']]]])
                .build()
        ).toBe('a b c');
    });

    it('throws error when the argument array is nested too many', () => {
        expect(() => classNames([[[[[[[[[[]]]]]]]]]])).toThrowError();
        const arr = ['a'] as Arg[];
        arr.push(arr);
        expect(() => classNames(arr)).toThrowError();
    });
});
