const locales = require('./i18next-locales');

module.exports = {
    locales,
    lexers: {
        ts: ['JavascriptLexer'],
        tsx: ['JsxLexer'],
    },
    input: "src/**/*.{ts,tsx}",
    output: 'src/locales/$LOCALE.json',
    sort: true,
    indentation: 4,
    createOldCatalogs: false,
    namespaceSeparator: ':::',
    keySeparator: '::',
    pluralSeparator: '__',
    contextSeparator: '__',
}
