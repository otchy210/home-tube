import React, { useEffect } from 'react';

export type GetTitle = () => string;

const isGetTitle = (title?: string | GetTitle): title is GetTitle => {
    return typeof title === 'function';
};

const getTitle = (title: string | GetTitle): string => {
    if (isGetTitle(title)) {
        return title();
    }
    return title;
};

export const useSetTitle = (title?: string | GetTitle, dependencies: React.DependencyList = []) => {
    useEffect(() => {
        document.title = title ? `${getTitle(title)} | HomeTube` : 'HomeTube';
    }, dependencies);
};
