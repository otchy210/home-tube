import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ConfigPage from './ConfigPage';
import createMockedApi from '../../__mocks__/createMockedApi';
import { ApiContext } from '../../utils/ApiContext';

describe('ConfigPage', () => {
    const mockedApi = createMockedApi();
    const mockedApiGetAppConfig = mockedApi.getAppConfig as jest.Mock;

    beforeEach(() => {
        jest.resetAllMocks();
    });
    it('renders initial state properly', (done) => {
        mockedApiGetAppConfig.mockReturnValue(
            new Promise((resolve) => {
                resolve({ storages: [] });
            })
        );
        (async () => {
            const { container, queryByTestId } = render(
                <ApiContext.Provider value={mockedApi}>
                    <ConfigPage />
                </ApiContext.Provider>
            );
            await waitFor(() => queryByTestId('save-config') !== null);
            expect(container).toMatchSnapshot();
            done();
        })();
    });
});
