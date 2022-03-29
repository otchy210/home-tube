import { render } from '@testing-library/react';
import React from 'react';
import StarIcon, { StarIconVariant } from './StarIcon';

describe('StarIcon', () => {
    const variantOptions = ['selected', 'unselected', 'void'] as StarIconVariant[];
    it.each(variantOptions)('renders properly with variant %s', (variant) => {
        const { container } = render(<StarIcon variant={variant} size={16} />);
        expect(container).toMatchSnapshot();
    });
});
