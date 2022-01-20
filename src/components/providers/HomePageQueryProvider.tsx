import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setIfExist } from '../../utils/SearchParamsUtils';

export type HomePageQuery = {
    page?: string;
};

const getHomePageQueryFromUrl = (): HomePageQuery => {
    const [searchParams] = useSearchParams();
    const homePageQuery = {} as HomePageQuery;
    setIfExist('page', searchParams, (value) => (homePageQuery.page = value));
    return homePageQuery;
};

type HomePageQueryContextValue = {
    homePageQuery: HomePageQuery;
    setPage: (page: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const HomePageQueryContext = createContext<HomePageQueryContextValue>({ homePageQuery: {}, setPage: () => {} });

export const useHomePageQuery = (): HomePageQueryContextValue => {
    return useContext(HomePageQueryContext);
};

type Props = {
    children: ReactNode;
};

const HomePageQueryProvider: React.FC<Props> = ({ children }: Props) => {
    const [homePageQuery, setHomePageQuery] = useState<HomePageQuery>(getHomePageQueryFromUrl());
    const navigate = useNavigate();
    const setPage = (page: string) => {
        if (page === '1') {
            const updatedQuery = { ...homePageQuery };
            delete updatedQuery.page;
            setHomePageQuery(updatedQuery);
            navigate('');
        } else {
            const updatedQuery = { ...homePageQuery, page };
            setHomePageQuery(updatedQuery);
            navigate(`/?page=${page}`);
        }
    };
    return <HomePageQueryContext.Provider value={{ homePageQuery, setPage }}>{children}</HomePageQueryContext.Provider>;
};

export default HomePageQueryProvider;
