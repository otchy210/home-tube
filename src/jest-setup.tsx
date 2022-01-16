import React from 'react';
import '@testing-library/jest-dom';

jest.mock('./components/molecules/DelayedSpinner', () => () => {
    const MockedDelayedSpinner: React.FC = () => {
        return <>mocked-delayed-spinner</>;
    };
    return <MockedDelayedSpinner />;
});
