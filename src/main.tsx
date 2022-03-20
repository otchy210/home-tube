import { DEFAULT_API_PORT } from '@otchy/home-tube-api/dist/const';
import React from 'react';
import ReactDOM from 'react-dom';
import { InitialParams } from '../src-server/common';
import App from './components/App';

const buildDefaultInitialParams = (url: URL): InitialParams => {
    return {
        apiHost: `${url.protocol}//${url.hostname}:${DEFAULT_API_PORT}`,
    };
};

const getInitialParams = (): Promise<InitialParams> => {
    // Web app initializing process provides this file when initialParams are set.
    const initialParamsPath = `/initialParams.json`;
    const url = new URL(location.href);
    return new Promise((resolve) => {
        fetch(initialParamsPath)
            .then((response) => {
                if (response.ok) {
                    response.json().then((params) => {
                        const apiHost = params.apiHost as string;
                        resolve({
                            ...params,
                            apiHost: apiHost.replace('{ws-protocol}', url.protocol.replace(':', '')).replace('{ws-hostname}', url.hostname),
                        });
                    });
                } else {
                    resolve(buildDefaultInitialParams(url));
                }
            })
            .catch((e) => {
                console.warn(e);
                resolve(buildDefaultInitialParams(url));
            });
    });
};

const initializeApp = async () => {
    const root = document.getElementById('root');
    if (!root) {
        return;
    }
    const initialParams = await getInitialParams();
    ReactDOM.render(<App {...initialParams} />, root);
};
initializeApp();
