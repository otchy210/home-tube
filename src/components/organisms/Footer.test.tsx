import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
    it('renders properly', () => {
        const { container } = render(<Footer />);
        expect(container).toMatchSnapshot();
    });
});
