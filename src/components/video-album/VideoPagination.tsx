import React, { useEffect } from 'react';
import { FullWidthCol, Row } from '../common/layouts';
import { PageItem, PageItemEllipsis, PageItemFirst, PageItemLast, PageItemNext, PageItemPrev, Pagination } from '../common/pagination';
import { Shortcut, useShortcut } from '../providers/ShortcutProvider';

type Props = {
    currentPage: number;
    visiblePages: number[];
    lastPage: number;
    onClick: (page: number) => void;
};

const VideoPagination: React.FC<Props> = ({ currentPage, visiblePages, lastPage, onClick }: Props) => {
    const { registerShortcut, unregisterShortcut } = useShortcut();
    const firstVisiblePage = visiblePages[0];
    const lastVisiblePage = visiblePages[visiblePages.length - 1];
    const internalOnClick = (page: number) => {
        window.scrollTo(0, 0);
        onClick(page);
    };
    useEffect(() => {
        const firstShortcut: Shortcut = {
            keyCode: 37,
            shiftKey: true,
            fn: () => internalOnClick(1),
        };
        const prevShortcut: Shortcut = {
            keyCode: 37,
            fn: () => internalOnClick(currentPage - 1),
        };
        const nextShortcut: Shortcut = {
            keyCode: 39,
            fn: () => internalOnClick(currentPage + 1),
        };
        const lastShortcut: Shortcut = {
            keyCode: 39,
            shiftKey: true,
            fn: () => internalOnClick(lastPage),
        };
        const pageShortcuts: Shortcut[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
            .filter((page) => {
                return page !== currentPage && page <= lastPage;
            })
            .map((page) => {
                return {
                    keyCode: 48 + page,
                    fn: () => internalOnClick(page),
                };
            });
        pageShortcuts.forEach((shortcut) => registerShortcut(shortcut));
        if (currentPage !== 1) {
            registerShortcut(firstShortcut);
            registerShortcut(prevShortcut);
        }
        if (currentPage !== lastPage) {
            registerShortcut(nextShortcut);
            registerShortcut(lastShortcut);
        }
        return () => {
            if (currentPage !== 1) {
                unregisterShortcut(firstShortcut);
                unregisterShortcut(prevShortcut);
            }
            if (currentPage !== lastPage) {
                unregisterShortcut(nextShortcut);
                unregisterShortcut(lastShortcut);
            }
            pageShortcuts.forEach((shortcut) => unregisterShortcut(shortcut));
        };
    }, [currentPage, visiblePages, lastPage]);
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
                        title={currentPage !== 1 ? '(Shift + ←)' : undefined}
                        data-testid="page-first"
                    />
                    <PageItemPrev
                        disabled={currentPage === 1}
                        onClick={() => {
                            internalOnClick(currentPage - 1);
                        }}
                        key="page-prev"
                        title={currentPage !== 1 ? '(←)' : undefined}
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
                                title={currentPage !== page ? `(${page})` : undefined}
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
                        title={currentPage !== lastPage ? '(→)' : undefined}
                        data-testid="page-next"
                    />
                    <PageItemLast
                        disabled={currentPage === lastPage}
                        onClick={() => {
                            internalOnClick(lastPage);
                        }}
                        key="page-last"
                        title={currentPage !== lastPage ? '(Shift + →)' : undefined}
                        data-testid="page-last"
                    />
                </Pagination>
            </FullWidthCol>
        </Row>
    );
};

export default VideoPagination;
