const Webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
    // development打包的文件不会被压缩，production打包会被压缩
    mode: 'development',
    // 打开source-map
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        // Hot Module Replacement
        new Webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 8080,
        // 自动打开浏览器
        open: true,
        contentBase: './dist/',
        // 开启gzip压缩
        compress: true,
        // 本地开发跨域配置
        proxy: {
            '/api': {
                target: 'http://testfeapi.colourfulchina.com:8080'
            }
        },
        // Hot Module Replacement
        hot: true,
        // 不刷新
        // hotOnly: true
    },
    // tree shaking; product已经默认写好，则可以不用写了
    optimization: {
        usedExports: true
    }
}

module.exports = webpackMerge(devConfig, commonConfig);