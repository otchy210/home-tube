import React, { createContext, ReactNode, useContext, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { setIfExist } from '../../utils/SearchParamsUtils';

export type SearchQuery = {
    page?: string;
    names?: string;
    length?: string;
    size?: string;
    stars?: string;
    tags?: string;
};

const getSearchQueryFromUrl = (): SearchQuery => {
    const [searchParams] = useSearchParams();
    const searchQuery = {} as SearchQuery;
    setIfExist('page', searchParams, (value) => (searchQuery.page = value));
    setIfExist('names', searchParams, (value) => (searchQuery.names = value));
    setIfExist('length', searchParams, (value) => (searchQuery.length = value));
    setIfExist('size', searchParams, (value) => (searchQuery.size = value));
    setIfExist('stars', searchParams, (value) => (searchQuery.stars = value));
    setIfExist('tags', searchParams, (value) => (searchQuery.tags = value));
    return searchQuery;
};

const copyWithoutPage = (searchQuery: SearchQuery): SearchQuery => {
    const copiedSearchQuery = {} as SearchQuery;
    if (searchQuery.names) {
        copiedSearchQuery.names = searchQuery.names;
    }
    if (searchQuery.length) {
        copiedSearchQuery.length = searchQuery.length;
    }
    if (searchQuery.size) {
        copiedSearchQuery.size = searchQuery.size;
    }
    if (searchQuery.stars) {
        copiedSearchQuery.stars = searchQuery.stars;
    }
    if (searchQuery.tags) {
        copiedSearchQuery.tags = searchQuery.tags;
    }
    return copiedSearchQuery;
};

type SearchQueryContextValue = {
    searchQuery: SearchQuery;
    setSearchQuery: (searchQuery: SearchQuery) => void;
    setPage: (page: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const SearchQueryContext = createContext<SearchQueryContextValue>({ searchQuery: {}, setSearchQuery: () => {}, setPage: () => {} });

export const useSearchQuery = (): SearchQueryContextValue => {
    return useContext(SearchQueryContext);
};

type Props = {
    children: ReactNode;
};

const SearchQueryProvider: React.FC<Props> = ({ children }: Props) => {
    const [searchQuery, setSearchQueryState] = useState<SearchQuery>(getSearchQueryFromUrl());
    const navigate = useNavigate();
    const setSearchQuery = (searchQuery: SearchQuery) => {
        const params = createSearchParams();
        let hasParams = false;
        Object.entries(searchQuery).forEach(([name, value]) => {
            if (!value) {
                return;
            }
            params.append(name, value);
            hasParams = true;
        });
        navigate(`/search${hasParams ? `?${params.toString()}` : ''}`);
        setSearchQueryState(searchQuery);
    };
    const setPage = (page: string) => {
        if (page === '1') {
            const updatedQuery = copyWithoutPage(searchQuery);
            setSearchQuery(updatedQuery);
        } else {
            const updatedQuery = { ...searchQuery, page };
            setSearchQuery(updatedQuery);
        }
    };
    return <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery, setPage }}>{children}</SearchQueryContext.Provider>;
};

export default SearchQueryProvider;
