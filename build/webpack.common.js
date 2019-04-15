const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        // 打包生成多文件
        home: './src/index.js',
        common: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                // 排除node_modules
                exclude: /node_modules/, 
                loader: "babel-loader",
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
            },
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
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),
    ],
    output: {
        // 对应entry的文件，生成多个文件
        filename: '[name].js',
        // __dirname当前目录
        path: path.resolve(__dirname, '../dist')    
    },
}