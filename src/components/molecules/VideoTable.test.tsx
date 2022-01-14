import React from 'react';
import { render } from '@testing-library/react';
import VideoTable from './VideoTable';
import { VideoDocument } from '@otchy/home-tube-api/dist/types';
import { BrowserRouter } from 'react-router-dom';
import createMockedApi from '../../__mocks__/createMockedApi';
import ApiProvider from '../providers/ApiProvider';

describe('VideoTable', () => {
    it('renders properly', () => {
        const videos = new Array(6).fill('').map((_, index) => {
            return {
                id: index + 1,
                values: {
                    name: `Video-${index + 1}`,
                },
            };
        }) as VideoDocument[];
        const mockedApi = createMockedApi();
        const { container } = render(
            <ApiProvider api={mockedApi}>
                <BrowserRouter>
                    <VideoTable videos={videos} />
                </BrowserRouter>
            </ApiProvider>
        );
        expect(container).toMatchSnapshot();
    });
});