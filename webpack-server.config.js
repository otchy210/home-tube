module.exports = {
    mode: 'development',
    entry: {
        server: './src/server/main.ts',
    },
    output: {
        path: `${__dirname}/bin`,
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: [
            '.js', '.ts',
        ],
    },
    target: ['node'],
};
