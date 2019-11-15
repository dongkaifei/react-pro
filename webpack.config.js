const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const pluginsConfig = () => {
    return [
        new CleanWebpackPlugin(),
        // new NyanProgressPlugin({
        //     restoreCursorPosition: true,
        //     nyanCatSays: () => "hello c!"
        // }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[name].[hash].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new CopyPlugin([
            {
                from: 'public/',
                to: ''
            }
        ])
    ];
}

const moduleLoaders = () => {
    return {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }, {
                    loader: 'eslint-loader'
                }]
            },
            {
                test: /\.(sa|le|c)ss$/,
                exclude: /node_modules/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: process.env.NODE_ENV === 'development',
                    },
                },
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            localIdentName: '[name]_[local]_[hash:base64:5]',
                        }
                    }
                },
                {
                    loader: "postcss-loader"
                },
                {
                    loader: "less-loader"
                }]
            },
            {//antd样式处理
                test: /\.css$/,
                exclude: /src/,
                use: [
                    { loader: "style-loader", },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:8].[ext]'
                }
            }
        ]
    }
}

module.exports = {
    entry: [
        "core-js/modules/es6.promise",
        "core-js/modules/es6.array.iterator",
        "./src/index.js"
    ],
    output: {
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    //devtool: 'cheap-source-map', //是否开启map
    plugins: pluginsConfig(),
    module: moduleLoaders(),

    optimization: {
        //code split， [node_modules,react,react-dom] all build in vendor
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '^', //分隔符
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                }
            }
        }
    },

    //开发配置
    devServer: {
        // allowedHosts: [
        //   'dkf.dev.demo.com'
        // ],  //开发域名白名单
        // sockHost: "dkf.dev.demo.com",
        disableHostCheck: true,
        // proxy: {
        //   "/logic/v1": {
        //     target: "https://api.testing.demo.com",
        //     ws: true,
        //     changeOrigin: true
        //   }
        // }, //配置开发代理
        host: '0.0.0.0',
        stats: 'minimal',  //打包信息显示模式，quiet为true时无效
        historyApiFallback: true, //histrory模式下需要设置成true
        open: false,   //是否需要自动打开浏览器
        quiet: false,   //构建起来静悄悄，同时隐藏警告信息
        inline: true,   //是否将构建的warning和error输出到控制台
        port: 10080
    }
};