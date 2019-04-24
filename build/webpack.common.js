const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        // 打包生成多文件
        home: './src/index.js',
        // common: './src/index.js'
    },
    // 引入文件忽略文件后缀
    resolve: {
        extensions: ['.js', '.jsx'],
        // 默认index文件，可以不写
        mainFiles: ['index'],
        // 文件别名，方便引入深层次的文件
        // alias: {
        //     common: path.resolve(__dirname, 'src/a/b/common/'),
        // }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, 
                // 排除node_modules
                exclude: /node_modules/, 
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    // loader: 'file-loader',
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        // 超过limit，等价于file-loader；反之会转化为base文件放在打包过后的文件中
                        limit: 10240
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff)$/,
                use: {
                    loader: 'file-loader',
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        usedExports: true,
        // 通常设置成这样就可以了
        splitChunks: {
            // 默认async 异步加载性能好
            chunks: 'all',
            // minSize: 30000,
            // maxSize: 0,
            // // minChunks：1使用1次就进行代码分割
            // minChunks: 1,
            // maxAsyncRequests: 5,
            // maxInitialRequests: 3,
            // automaticNameDelimiter: '~',
            // name: true,
            // cacheGroups: {
            //   vendors: {
            //     test: /[\\/]node_modules[\\/]/,
            //     // priority 越大优先级越高
            //     priority: -10,
            //     // filename: 'vendors.js'
            //   },
            //   default: {
            //     // filename: 'common.js',
            //     priority: -20,
            //     reuseExistingChunk: true
            //   }
            // }
        }
    },
    output: {
        path: path.resolve(__dirname, '../dist') 
    }
}