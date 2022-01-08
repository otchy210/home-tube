import React from 'react';
import { render } from '@testing-library/react';
import ConfigPage from './ConfigPage';

describe('ConfigPage', () => {
    it('renders properly', () => {
        const { container } = render(<ConfigPage />);
        expect(container).toMatchSnapshot();
    });
});
