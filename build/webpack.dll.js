const path = require('path');

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
    }
};