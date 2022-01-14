import React, { createContext, ReactNode, useContext, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

export type SearchQuery = {
    names?: string;
    length?: string;
    size?: string;
    stars?: string;
    tags?: string;
};

const setIfExist = (name: string, searchParams: URLSearchParams, setter: (value: string) => void) => {
    const value = searchParams.get(name);
    if (!value) {
        return;
    }
    setter(value);
};

const getSearchQueryFromUrl = (): SearchQuery => {
    const [searchParams] = useSearchParams();
    const searchQuery = {} as SearchQuery;
    setIfExist('names', searchParams, (value) => (searchQuery.names = value));
    setIfExist('length', searchParams, (value) => (searchQuery.length = value));
    setIfExist('size', searchParams, (value) => (searchQuery.size = value));
    setIfExist('stars', searchParams, (value) => (searchQuery.stars = value));
    setIfExist('tags', searchParams, (value) => (searchQuery.tags = value));
    return searchQuery;
};

type SearchQueryContextValue = { searchQuery: SearchQuery; setSearchQuery: (searchQuery: SearchQuery) => void };

// eslint-disable-next-line @typescript-eslint/no-empty-function
const SearchQueryContext = createContext<SearchQueryContextValue>({ searchQuery: {}, setSearchQuery: () => {} });

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
    return <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>{children}</SearchQueryContext.Provider>;
};

export default SearchQueryProvider;
