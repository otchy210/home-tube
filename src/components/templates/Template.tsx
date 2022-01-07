import React, { ReactNode } from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

type Props = {
    children: ReactNode;
};

const Template: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <main style={{ marginTop: '66px' }}>{children}</main>
            <Footer />
        </>
    );
};

export default Template;
