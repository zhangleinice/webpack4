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
    },
    module: {
        rules: [
            // 使用less-loader，还需安装 less
            {
                test: /\.less$/,
                use: [
                    'style-loader', 
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
        ]
    },
    output: {
        // 对应entry的文件，生成多个文件
        filename: '[name].js',
    },
}

module.exports = webpackMerge(devConfig, commonConfig);