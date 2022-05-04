import React from 'react';
import '@testing-library/jest-dom';

const CODE_A = 'A'.charCodeAt(0);
const CODE_Z = 'Z'.charCodeAt(0);

const isUpperCase = (ch: string) => {
    const code = ch.charCodeAt(0);
    return CODE_A <= code && code <= CODE_Z;
};

const mockFC = (path: string, componentName?: string): void => {
    if (componentName) {
        const mockName = `mocked${componentName
            .split('')
            .map((ch, i) => {
                if (i === 0 || isUpperCase(ch)) {
                    return `-${ch.toLowerCase()}`;
                }
                return ch;
            })
            .join('')}`;
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const module = require(path);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jest.spyOn(module, componentName).mockImplementation((props?: any) => {
            return React.createElement(mockName, props);
        });
    } else {
        const names = path.split('/');
        const fileName = names[names.length - 1];
        const componentName = fileName.split(/[._-]/).join('-');
        const mockName = `mocked-${componentName}`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jest.mock(path, () => (props?: any) => {
            return React.createElement(mockName, props);
        });
    }
};

// async components
mockFC('./components/common/DelayedSpinner');

// svg components
mockFC('./components/images/StarSelectedSvg', 'StarSelectedSvg');
mockFC('./components/images/StarUnselectedSvg', 'StarUnselectedSvg');
mockFC('./components/images/StarVoidSvg', 'StarVoidSvg');
