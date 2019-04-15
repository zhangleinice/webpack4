const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
    // development打包的文件不会被压缩，production打包会被压缩
    mode: 'production',
    // 打开source-map
    devtool: 'cheap-module-source-map',
}
module.exports = webpackMerge(prodConfig, commonConfig);