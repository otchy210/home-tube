import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Api } from '../utils/Api';
import Footer from './organisms/Footer';
import Header from './organisms/Header';
import Toasts from './organisms/Toasts';
import ConfigPage from './pages/ConfigPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';
import ViewPage from './pages/ViewPage';
import ApiProvider from './providers/ApiProvider';
import SearchQueryProvider from './providers/SearchQueryProvier';
import ToastProvider from './providers/ToastsProvider';

type Props = {
    apiHost: string;
};

const App: React.FC<Props> = ({ apiHost }) => {
    return (
        <BrowserRouter>
            <ApiProvider api={new Api(apiHost)}>
                <ToastProvider>
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
                </ToastProvider>
            </ApiProvider>
        </BrowserRouter>
    );
};

export default App;
