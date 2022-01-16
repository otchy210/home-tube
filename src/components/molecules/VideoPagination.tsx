import React from 'react';
import { Col, Pagination, Row } from 'react-bootstrap';

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
            <Col xs={12} className="mt-4">
                <Pagination className="justify-content-center">
                    <Pagination.First
                        disabled={currentPage === 1}
                        onClick={() => {
                            internalOnClick(1);
                        }}
                        key="page-first"
                        data-testid="page-first"
                    />
                    <Pagination.Prev
                        disabled={currentPage === 1}
                        onClick={() => {
                            internalOnClick(currentPage - 1);
                        }}
                        key="page-prev"
                        data-testid="page-prev"
                    />
                    {firstVisiblePage > 1 && <Pagination.Ellipsis disabled key="page-ellipsis-start" data-testid="page-ellipsis-start" />}
                    {visiblePages.map((page) => {
                        return (
                            <Pagination.Item
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
                            </Pagination.Item>
                        );
                    })}
                    {lastVisiblePage < lastPage && <Pagination.Ellipsis disabled key="page-ellipsis-end" data-testid="page-ellipsis-end" />}
                    <Pagination.Next
                        disabled={currentPage === lastPage}
                        onClick={() => {
                            internalOnClick(currentPage + 1);
                        }}
                        key="page-next"
                        data-testid="page-next"
                    />
                    <Pagination.Last
                        disabled={currentPage === lastPage}
                        onClick={() => {
                            internalOnClick(lastPage);
                        }}
                        key="page-last"
                        data-testid="page-last"
                    />
                </Pagination>
            </Col>
        </Row>
    );
};

export default VideoPagination;
