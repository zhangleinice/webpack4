const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        vendors: ['react', 'react-dom', 'lodash']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../dll'),
        // 打包生成的库，通过全局变量暴露出去
        library: '[name]'
    },
    plugins: [
        // 第三方库生成映射文件
        new webpack.DllPlugin({
            // 和library名字一样
            name: '[name]',
            // 生成映射文件
            path: path.resolve(__dirname, '../dll/[name].manifest.json')
        })
    ]
};


