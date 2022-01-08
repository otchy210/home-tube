import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Footer from './organisms/Footer';
import Header from './organisms/Header';
import ConfigPage from './pages/ConfigPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';
import ViewPage from './pages/ViewPage';

const App: React.FC = () => {
    return (
        <>
            <Header />
            <Container style={{ marginTop: '60px' }}>
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
