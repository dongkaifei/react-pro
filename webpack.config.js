const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pluginsConfig = () => {
    return [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        })
    ];
}

const moduleLoaders = () => {
    return {
        rules: [
            // script
            {
                test: /\.(js|jsx)$/,
                use: [{
                    loader: 'babel-loader'
                }],
                exclude: /node_modules/
            },
            // css
            {
                test: /\.(sa|le|c)ss$/,
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
                    loader: "less-loader"
                },
                {
                    loader: "postcss-loader"
                }]
            },
            // image
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
    entry: './src/index.js',
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: pluginsConfig(),
    module: moduleLoaders(),

    //开发配置
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        allowedHosts: [
            'test.com'
        ],  //开发域名白名单
        historyApiFallback: true, //histrory模式下需要设置成true
        open: false,   //是否需要自动打开浏览器
        port: 8080
    }
};