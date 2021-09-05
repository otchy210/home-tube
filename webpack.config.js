const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        server: './src/server/main.ts',
        client: './src/client/main.tsx',
    },
    output: {
        path: `${__dirname}/public`,
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
    target: ["web", "es5"],
    devServer: {
        host: 'local-ip',
        port: 'auto',
        open: true,
        static: {
            directory: `${__dirname}/public`,
            watch: true,
        },
    },
};
