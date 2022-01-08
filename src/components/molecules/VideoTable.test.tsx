import React from 'react';
import { render } from '@testing-library/react';
import VideoTable from './VideoTable';
import { VideoDocument } from '@otchy/home-tube-api/dist/types';

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
        const { container } = render(<VideoTable videos={videos} />);
        expect(container).toMatchSnapshot();
    });
});
