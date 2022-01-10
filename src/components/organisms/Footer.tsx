import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-muted small text-white-50 mt-3 py-1 px-3">
            HomeTube is written by{' '}
            <a href="https://twitter.com/otchy" target="_blank">
                @otchy
            </a>
            . Find more info in the{' '}
            <a href="https://github.com/otchy210/home-tube" target="_blank">
                GitHub page
            </a>
            .
        </footer>
    );
};

export default Footer;
