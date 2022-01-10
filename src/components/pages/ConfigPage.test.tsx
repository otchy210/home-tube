import React from 'react';
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import ConfigPage from './ConfigPage';
import createMockedApi from '../../__mocks__/createMockedApi';
import { ApiContext } from '../../utils/ApiContext';
import { AppConfig } from '@otchy/home-tube-api/dist/types';

describe('ConfigPage', () => {
    const mockedApi = createMockedApi();
    const mockedApiGetAppConfig = mockedApi.getAppConfig as jest.Mock;

    const testWithAppConfig = async (appConfig: AppConfig, test: (renderResult: RenderResult) => Promise<void>, done: jest.DoneCallback) => {
        mockedApiGetAppConfig.mockReturnValue(
            new Promise((resolve) => {
                resolve(appConfig);
            })
        );
        (async () => {
            const renderResult = render(
                <ApiContext.Provider value={mockedApi}>
                    <ConfigPage />
                </ApiContext.Provider>
            );
            await waitFor(() => renderResult.queryByTestId('save-config') !== null);
            await test(renderResult);
            done();
        })();
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });
    it('renders initial state properly', (done) => {
        testWithAppConfig(
            { storages: [] },
            async ({ container }) => {
                expect(container).toMatchSnapshot();
            },
            done
        );
    });

    it('reflects appConfig properly', (done) => {
        testWithAppConfig(
            {
                storages: [
                    { path: '/path/1/', enabled: true },
                    { path: '/path/2/', enabled: false },
                ],
                ffmpeg: '/path/ffmpeg',
            },
            async ({ getByTestId }) => {
                const storage0Path = getByTestId('storage-0-path') as HTMLInputElement;
                const storage1Path = getByTestId('storage-1-path') as HTMLInputElement;
                const storage0Enabled = getByTestId('storage-0-enabled') as HTMLInputElement;
                const storage1Enabled = getByTestId('storage-1-enabled') as HTMLInputElement;
                const ffmpeg = getByTestId('ffmpeg') as HTMLInputElement;
                expect(storage0Path.value).toBe('/path/1/');
                expect(storage1Path.value).toBe('/path/2/');
                expect(storage0Enabled.checked).toBe(true);
                expect(storage1Enabled.checked).toBe(false);
                expect(ffmpeg.value).toBe('/path/ffmpeg');
            },
            done
        );
    });

    it('adds storage properly', (done) => {
        testWithAppConfig(
            {
                storages: [
                    { path: '/path/1/', enabled: true },
                    { path: '/path/2/', enabled: false },
                ],
            },
            async ({ getByTestId }) => {
                fireEvent.click(getByTestId('add-storage'));
                const storage2Path = getByTestId('storage-2-path') as HTMLInputElement;
                const storage2Enabled = getByTestId('storage-2-enabled') as HTMLInputElement;
                expect(storage2Path.value).toBe('');
                expect(storage2Enabled.checked).toBe(true);
            },
            done
        );
    });

    it('removes storage properly', (done) => {
        testWithAppConfig(
            {
                storages: [
                    { path: '/path/1/', enabled: true },
                    { path: '/path/2/', enabled: false },
                ],
            },
            async ({ getByTestId, queryByTestId }) => {
                fireEvent.click(getByTestId('storage-0-delete'));
                const storage0Path = getByTestId('storage-0-path') as HTMLInputElement;
                const storage0Enabled = getByTestId('storage-0-enabled') as HTMLInputElement;
                expect(storage0Path.value).toBe('/path/2/');
                expect(storage0Enabled.checked).toBe(false);
                expect(queryByTestId('storage-1-path')).not.toBeInTheDocument();
            },
            done
        );
    });
});
