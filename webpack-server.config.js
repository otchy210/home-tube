module.exports = {
    mode: 'development',
    entry: {
        server: './src/server/main.js',
    },
    output: {
        path: `${__dirname}/bin`,
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: [
            '.js',
        ],
    },
    target: ['node'],
};
