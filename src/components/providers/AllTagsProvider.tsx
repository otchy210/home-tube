import { AllTags } from '@otchy/home-tube-api/dist/types';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useApi } from './ApiProvider';

type AllTagsContextValue = {
    allTags: AllTags;
    sortedTags: string[];
    reload: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const AllTagsContext = createContext<AllTagsContextValue>({ allTags: {}, sortedTags: [], reload: () => {} });

export const useAllTags = (): AllTagsContextValue => {
    return useContext(AllTagsContext);
};

type Props = {
    children: ReactNode;
};

const AllTagsProvider: React.FC<Props> = ({ children }: Props) => {
    const [allTags, setAllTags] = useState<AllTags>({});
    const [sortedTags, setSortedTags] = useState<string[]>([]);
    const api = useApi();
    const reload = () => {
        api.getAllTags().then((allTags) => {
            setAllTags(allTags);
            const sortedTags = Object.entries(allTags)
                .sort((left, right) => {
                    const leftCount = left[1];
                    const rightCount = right[1];
                    if (leftCount !== rightCount) {
                        return rightCount - leftCount;
                    }
                    const leftTag = left[0];
                    const rightTag = right[0];
                    return leftTag.localeCompare(rightTag);
                })
                .map(([tag]) => tag);
            setSortedTags(sortedTags);
        });
    };
    useEffect(() => {
        reload();
    }, []);
    return <AllTagsContext.Provider value={{ allTags, sortedTags, reload }}>{children}</AllTagsContext.Provider>;
};

export default AllTagsProvider;
