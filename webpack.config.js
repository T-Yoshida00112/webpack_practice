const path = require('path');
const Fiber = require('fibers')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        main: './src/js/main.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name]-[contenthash].js',
    },
    module: {
        rules: [{
                test: /\.(css|sass|scss)/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg)/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name]-[contenthash][ext]',
                },
                use: [
                    // {
                    //   loader: 'file-loader',
                    //   options: {
                    //     esModule: false,
                    //     name: 'images/[name].[ext]',
                    //   },
                    // },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.pug/,
                use: [{
                        loader: 'html-loader',
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './sass/[name]-[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/pug/index.pug',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/pug/access.pug',
            filename: 'access.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/pug/members/taro.pug',
            filename: 'members/taro.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/pug/parts/button.pug',
            filename: 'parts/button.html'
        }),
        new CleanWebpackPlugin(),
    ],
};
