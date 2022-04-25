import React from 'react';
import { FullWidthCol, Row } from '../common/layouts';
import { PageItem, PageItemEllipsis, PageItemFirst, PageItemLast, PageItemNext, PageItemPrev, Pagination } from '../common/pagination';

type Props = {
    currentPage: number;
    visiblePages: number[];
    lastPage: number;
    onClick: (page: number) => void;
};

const VideoPagination: React.FC<Props> = ({ currentPage, visiblePages, lastPage, onClick }: Props) => {
    const firstVisiblePage = visiblePages[0];
    const lastVisiblePage = visiblePages[visiblePages.length - 1];
    const internalOnClick = (page: number) => {
        window.scrollTo(0, 0);
        onClick(page);
    };
    return (
        <Row>
            <FullWidthCol className="mt-4">
                <Pagination className="justify-content-center my-0">
                    <PageItemFirst
                        disabled={currentPage === 1}
                        onClick={() => {
                            internalOnClick(1);
                        }}
                        key="page-first"
                        data-testid="page-first"
                    />
                    <PageItemPrev
                        disabled={currentPage === 1}
                        onClick={() => {
                            internalOnClick(currentPage - 1);
                        }}
                        key="page-prev"
                        data-testid="page-prev"
                    />
                    {firstVisiblePage > 1 && <PageItemEllipsis disabled key="page-ellipsis-start" data-testid="page-ellipsis-start" />}
                    {visiblePages.map((page) => {
                        return (
                            <PageItem
                                active={currentPage === page}
                                onClick={() => {
                                    if (currentPage !== page) {
                                        internalOnClick(page);
                                    }
                                }}
                                key={`page-${page}`}
                                data-testid="page-visible"
                            >
                                {page}
                            </PageItem>
                        );
                    })}
                    {lastVisiblePage < lastPage && <PageItemEllipsis disabled key="page-ellipsis-end" data-testid="page-ellipsis-end" />}
                    <PageItemNext
                        disabled={currentPage === lastPage}
                        onClick={() => {
                            internalOnClick(currentPage + 1);
                        }}
                        key="page-next"
                        data-testid="page-next"
                    />
                    <PageItemLast
                        disabled={currentPage === lastPage}
                        onClick={() => {
                            internalOnClick(lastPage);
                        }}
                        key="page-last"
                        data-testid="page-last"
                    />
                </Pagination>
            </FullWidthCol>
        </Row>
    );
};

export default VideoPagination;
