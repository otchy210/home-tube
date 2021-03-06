import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Api } from '../utils/Api';
import { Container } from './common/layouts';
import Toasts from './common/Toasts';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import ConfigPage from './pages/ConfigPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';
import ViewPage from './pages/ViewPage';
import AllTagsProvider from './providers/AllTagsProvider';
import ApiProvider from './providers/ApiProvider';
import HomePageQueryProvider from './providers/HomePageQueryProvider';
import I18nProvider, { useI18n } from './providers/I18nProvider';
import SearchQueryProvider from './providers/SearchQueryProvider';
import { ShortcutProvider } from './providers/ShortcutProvider';
import ToastProvider from './providers/ToastsProvider';

const GlobalStyle = createGlobalStyle`
    :root {
        scroll-behavior: unset;
    }
    #root {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
`;

type Props = {
    apiHost: string;
};

const App: React.FC<Props> = ({ apiHost }) => {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <ApiProvider api={new Api(apiHost)}>
                    <I18nProvider>
                        <ToastProvider>
                            <ShortcutProvider>
                                <AllTagsProvider>
                                    <HomePageQueryProvider>
                                        <SearchQueryProvider>
                                            <Page />
                                        </SearchQueryProvider>
                                    </HomePageQueryProvider>
                                </AllTagsProvider>
                            </ShortcutProvider>
                        </ToastProvider>
                    </I18nProvider>
                </ApiProvider>
            </BrowserRouter>
        </>
    );
};

const Page: React.FC = () => {
    const { translationReady } = useI18n();
    if (!translationReady) {
        return null;
    }
    return (
        <>
            <Header />
            <Toasts />
            <Container className="mb-auto" style={{ marginTop: '60px' }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/config" element={<ConfigPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/view" element={<ViewPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Container>
            <Footer />
        </>
    );
};

export default App;
