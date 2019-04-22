const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
// css分离打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css,只能压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
    // development打包的文件不会被压缩，production打包会被压缩
    mode: 'production',
    // 打开source-map
    devtool: 'cheap-module-source-map',
    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // 在less中@import less,重新从后面两个loader执行
                            importLoaders: 2,     // default 0
                            // css模块化，防止全局样式冲突
                            // modules: true,
                        }      
                    },
                    'less-loader', 
                    'postcss-loader'
                ]
            }
        ],
    },
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})]
    },
    output: {
        // contenthash解决浏览器缓存问题，内容变化，文件名才会变化
        filename: '[name].[contenthash].js'
    },
}
module.exports = webpackMerge(prodConfig, commonConfig);