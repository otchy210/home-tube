import React from 'react';
import { render } from '@testing-library/react';
import Main from './Main';

describe('Main', () => {
    it('renders properly', () => {
        const { container } = render(<Main></Main>);
        expect(container).toMatchSnapshot();
    });
});
