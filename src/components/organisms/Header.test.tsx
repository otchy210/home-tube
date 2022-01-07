import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
    it('renders properly', () => {
        const { container } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
        expect(container).toMatchSnapshot();
    });
});
