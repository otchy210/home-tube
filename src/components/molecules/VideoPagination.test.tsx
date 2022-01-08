import React from 'react';
import { render } from '@testing-library/react';
import VideoPagination from './VideoPagination';

describe('VideoPagination', () => {
    const mockedOnClick = jest.fn();

    it('works properly when it has only 1 page', () => {
        const { queryByTestId, getByTestId, getAllByTestId } = render(
            <VideoPagination currentPage={1} visiblePages={[1]} lastPage={1} onClick={mockedOnClick} />
        );
        expect(getByTestId('page-first').parentElement).toHaveClass('disabled');
        expect(getByTestId('page-prev').parentElement).toHaveClass('disabled');
        expect(queryByTestId('page-ellipsis-start')).toBeNull();
        const allVisiblePages = getAllByTestId('page-visible');
        expect(allVisiblePages.length).toBe(1);
        expect(allVisiblePages[0].parentElement).toHaveClass('active');
        expect(queryByTestId('page-ellipsis-end')).toBeNull();
        expect(getByTestId('page-next').parentElement).toHaveClass('disabled');
        expect(getByTestId('page-last').parentElement).toHaveClass('disabled');
    });

    it.each([
        [1, true, false],
        [2, false, false],
        [3, false, true],
    ])('works properly when it has 3 pages and currentPage = %d', (currentPage, prevButtonDisabled, nextButtonDisabled) => {
        const { queryByTestId, getByTestId, getAllByTestId } = render(
            <VideoPagination currentPage={currentPage} visiblePages={[1, 2, 3]} lastPage={3} onClick={mockedOnClick} />
        );
        if (prevButtonDisabled) {
            expect(getByTestId('page-first').parentElement).toHaveClass('disabled');
            expect(getByTestId('page-prev').parentElement).toHaveClass('disabled');
        } else {
            expect(getByTestId('page-first').parentElement).not.toHaveClass('disabled');
            expect(getByTestId('page-prev').parentElement).not.toHaveClass('disabled');
        }
        expect(queryByTestId('page-ellipsis-start')).toBeNull();
        const allVisiblePages = getAllByTestId('page-visible');
        expect(allVisiblePages.length).toBe(3);
        expect(allVisiblePages[currentPage - 1].parentElement).toHaveClass('active');
        expect(queryByTestId('page-ellipsis-end')).toBeNull();
        if (nextButtonDisabled) {
            expect(getByTestId('page-next').parentElement).toHaveClass('disabled');
            expect(getByTestId('page-last').parentElement).toHaveClass('disabled');
        } else {
            expect(getByTestId('page-next').parentElement).not.toHaveClass('disabled');
            expect(getByTestId('page-last').parentElement).not.toHaveClass('disabled');
        }
    });

    it.each([
        [[1, 2, 3], false, true],
        [[2, 3, 4], true, true],
        [[3, 4, 5], true, false],
    ])('handles ellipsis properly when it has invisible pages when visiblePages looks like = %s', (visiblePages, ellipsisStartVisible, ellipsisEndVisible) => {
        const { queryByTestId } = render(<VideoPagination currentPage={visiblePages[1]} visiblePages={visiblePages} lastPage={5} onClick={mockedOnClick} />);
        if (ellipsisStartVisible) {
            expect(queryByTestId('page-ellipsis-start')).toBeInTheDocument();
        } else {
            expect(queryByTestId('page-ellipsis-start')).toBeNull();
        }
        if (ellipsisEndVisible) {
            expect(queryByTestId('page-ellipsis-end')).toBeInTheDocument();
        } else {
            expect(queryByTestId('page-ellipsis-end')).toBeNull();
        }
    });
});
