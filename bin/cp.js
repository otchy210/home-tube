const fs = require('fs');
const locales = require('../i18next-locales');

fs.mkdirSync('dist/locales', { recursive: true });
fs.copyFileSync('src/index.html', 'dist/index.html');
fs.copyFileSync('src/images/favicon.png', 'dist/favicon.png');
locales.forEach((lang) => {
    fs.copyFileSync(`src/locales/${lang}.json`, `dist/locales/${lang}.json`);
});
