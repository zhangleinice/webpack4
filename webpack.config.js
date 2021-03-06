// node核心模块
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Webpack = require('webpack'); 

module.exports = {
    // development打包的文件不会被压缩，production打包会被压缩
    mode: 'development',
    // 打开source-map
    devtool: 'cheap-module-eval-source-map',
    entry: {
        // 打包生成多文件
        home: './src/index.js',
        common: './src/index.js'
    },
    // loader 打包方案
    module: {
        rules: [
            {
                test: /\.js$/, 
                // 排除node_modules
                exclude: /node_modules/, 
                loader: "babel-loader",
                // 配置可以写到.babelrc文件里面
                // 从右往左，先转化react，在转化es6
                // options: {
                //     "presets": [["@babel/preset-env", 
                //         // {
                //         //     targets: {
                //         //         // chrome 67以上已经支持es6，则不需要使用babel转es5
                //         //         chrome: "67",
                //         //     },
                //         //     useBuiltIns: "usage"
                //         // },
                           //"@babel/preset-react"
                        // ]]


                // 写一个内库时使用这种
                //     "presets": [["@babel/plugin-transform-runtime", 
                //         {
                //             "corejs": 2,
                //             "helpers": true,
                //             "regenerator": true,
                //             "useESModules": false
                //         }
                //     ]]
                // }
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
        // Hot Module Replacement
        new Webpack.HotModuleReplacementPlugin()
    ],
    output: {
        // 打包后引入的js前配置cdn地址
        // publicPath: 'http.cdn.com/',
        // 对应entry的文件，生成多个文件
        filename: '[name].js',
        // __dirname当前目录
        path: path.resolve(__dirname, 'dist')    
    },
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