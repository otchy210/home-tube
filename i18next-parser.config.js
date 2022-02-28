module.exports = {
    locales: ['en', 'ja'],
    lexers: {
        ts: ['JavascriptLexer'],
        tsx: ['JsxLexer'],
    },
    input: "src/**/*.{ts,tsx}",
    output: 'src/locales/$LOCALE/$NAMESPACE.json',
    sort: true,
    indentation: 4,
    createOldCatalogs: false,
}
