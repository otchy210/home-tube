module.exports = {
    mode: 'development',
    entry: {
        server: './src/server/main.ts',
        client: './src/client/main.ts'
    },
    output: {
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: [
            '.ts', '.tsx', '.js', '.jsx',
        ],
    },
};
