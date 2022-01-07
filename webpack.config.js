const path = require('path');

const mode = process.env.NODE_ENV || 'production';
const port = mode === 'production' ? 80 : 8080;

module.exports = {
    mode,
    entry: './src/main.tsx',
    output: {
        path: `${__dirname}/dist`,
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
            {
                test: /\.css/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: { url: false }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.svg']
    },
    target: ['web', 'es2015'],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: true,
        compress: true,
        port,
    },
};
