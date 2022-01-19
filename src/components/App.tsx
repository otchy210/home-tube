import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Api } from '../utils/Api';
import Footer from './organisms/Footer';
import Header from './organisms/Header';
import Toasts from './organisms/Toasts';
import ConfigPage from './pages/ConfigPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';
import ViewPage from './pages/ViewPage';
import AllTagsProvider from './providers/AllTagsProvider';
import ApiProvider from './providers/ApiProvider';
import SearchQueryProvider from './providers/SearchQueryProvier';
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
                    <ToastProvider>
                        <AllTagsProvider>
                            <SearchQueryProvider>
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
                            </SearchQueryProvider>
                        </AllTagsProvider>
                    </ToastProvider>
                </ApiProvider>
            </BrowserRouter>
        </>
    );
};

export default App;
