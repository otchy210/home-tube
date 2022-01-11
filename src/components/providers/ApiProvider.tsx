import React, { createContext, ReactNode, useContext } from 'react';
import { Api } from '../../utils/Api';

const ApiContext = createContext<Api | undefined>(undefined);

export const useApi = (): Api => {
    const api = useContext(ApiContext);
    if (!api) {
        throw new Error('Api is not provided via context');
    }
    return api;
};

type Props = {
    api: Api;
    children: ReactNode;
};

const ApiProvider: React.FC<Props> = ({ api, children }: Props) => {
    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export default ApiProvider;
