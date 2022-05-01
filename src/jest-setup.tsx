import React from 'react';
import '@testing-library/jest-dom';

const mockFC = (path: string): void => {
    const names = path.split('/');
    const fileName = names[names.length - 1];
    const componentName = fileName.split(/[._-]/).join('-');
    const mockName = `mocked-${componentName}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.mock(path, () => (props?: Record<string, any>) => {
        return React.createElement(mockName, props);
    });
};

// async components
mockFC('./components/common/DelayedSpinner');

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
