import { classNames } from './classNames';

describe('classNames', () => {
    it('returns null when no valid values added', () => {
        expect(classNames().build()).toBeNull();
        expect(classNames().add().build()).toBeNull();
        expect(classNames().add(null, undefined, '', []).build()).toBeNull();
        expect(classNames(' ', '   ', [null, undefined, ' '], [[[[]]]]).build()).toBeNull();
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
});
