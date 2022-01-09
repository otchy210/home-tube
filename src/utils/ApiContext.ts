import { createContext, useContext } from 'react';
import { Api } from './Api';

export const ApiContext = createContext<Api | undefined>(undefined);

export const useApi = (): Api => {
    const api = useContext(ApiContext);
    if (!api) {
        throw new Error('Api is not provided via context');
    }
    return api;
};
