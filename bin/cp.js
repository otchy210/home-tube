const fs = require('fs');
const locales = require('../i18next-locales');

fs.copyFileSync('src/index.html', 'dist/index.html');
fs.copyFileSync('src/images/favicon.png', 'dist/favicon.png');
fs.mkdirSync('dist/locales', { recursive: true });
locales.forEach((lang) => {
    fs.copyFileSync(`src/locales/${lang}.json`, `dist/locales/${lang}.json`);
});
