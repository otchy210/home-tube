import React from 'react';
import '@testing-library/jest-dom';

const mockFC = (path: string): void => {
    const names = path.split('/');
    const fileName = names[names.length - 1];
    const componentName = fileName
        .split(/[._-]/)
        .map((str) => {
            const firstChar = str.charAt(0).toUpperCase();
            const leftStr = str.substring(1);
            return `${firstChar}${leftStr}`;
        })
        .join('');
    const mockName = `Mocked${componentName}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.mock(path, () => (props?: Record<string, any>) => {
        const propsStr = !props
            ? ''
            : ` ${Object.entries(props)
                  .map(([name, value]) => {
                      switch (typeof value) {
                          case 'function':
                              return `${name}={fn}`;
                          case 'object':
                              return `${name}={obj}`;
                      }
                      return `${name}="${value.toString()}"`;
                  })
                  .join(' ')}`;
        return <>{`[${mockName}${propsStr} /]`}</>;
    });
};

// async components
mockFC('./components/molecules/DelayedSpinner');

// svg image components
mockFC('./images/icon.svg');
mockFC('./images/logo.svg');
mockFC('./images/search.svg');
mockFC('./images/language.svg');
mockFC('./images/config.svg');
mockFC('./images/star-selected.svg');
mockFC('./images/star-unselected.svg');
mockFC('./images/star-void.svg');
mockFC('./images/reload.svg');
mockFC('./images/spinner.svg');
mockFC('./images/edit.svg');
mockFC('./images/trashcan.svg');
