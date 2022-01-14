import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import ApiProvider from './components/providers/ApiProvider';
import SearchQueryProvider from './components/providers/SearchQueryProvier';
import ToastProvider from './components/providers/ToastsProvider';
import { Api } from './utils/Api';

type InitialParams = {
    apiHost: string;
};

const buildDefaultInitialParams = (): InitialParams => {
    const url = new URL(location.href);
    return {
        apiHost: `${url.protocol}//${url.hostname}:8210`,
    };
};

const getInitialParams = (): Promise<InitialParams> => {
    // Web app initializing process provides this file when initialParams are set.
    const initialParamsPath = `/initialParams.json`;
    return new Promise((resolve) => {
        fetch(initialParamsPath)
            .then((response) => {
                if (response.ok) {
                    response.json().then((params) => {
                        resolve(params);
                    });
                } else {
                    resolve(buildDefaultInitialParams());
                }
            })
            .catch((e) => {
                console.warn(e);
                resolve(buildDefaultInitialParams());
            });
    });
};

const initializeApp = async () => {
    const root = document.getElementById('root');
    if (!root) {
        return;
    }
    const initialParams = await getInitialParams();
    ReactDOM.render(
        <BrowserRouter>
            <ApiProvider api={new Api(initialParams.apiHost)}>
                <ToastProvider>
                    <SearchQueryProvider>
                        <App />
                    </SearchQueryProvider>
                </ToastProvider>
            </ApiProvider>
        </BrowserRouter>,
        root
    );
};
initializeApp();
