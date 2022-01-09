import React from 'react';
import { render } from '@testing-library/react';
import ConfigPage from './ConfigPage';
import createMockedApi from '../../__mocks__/createMockedApi';
import { ApiContext } from '../../utils/ApiContext';

describe('ConfigPage', () => {
    const mockedApi = createMockedApi();
    it('renders properly', () => {
        const { container } = render(
            <ApiContext.Provider value={mockedApi}>
                <ConfigPage />
            </ApiContext.Provider>
        );
        expect(container).toMatchSnapshot();
    });
});
