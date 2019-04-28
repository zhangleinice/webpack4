### webpack4（查看英文文档学习）

```js
    npx webpack      // 运行项目内webpack
    npm init -y      //快捷初始化
    webpack --config webpackconfig.js   //修改默认配置
```

### entry

### output
* publicPath

### loader

* 文件
1. file-loader
    - 打包字体图标
    - 不用css modules
2. url-loader
    - limit： 小于limit，会被转化为base64格式，大于limit使用file-loader
    - 如果图片只有1，2kb，打包成base64js文件很不错，不用多发一次http请求，如果图片太大，打包成base64，则会加载js比较慢

* 样式
1. style-loader
2. css-loader
   - 配置css模块化
   - importLoaders: 保证无论在js引入less，还是less中引入都重新经过less-loader，postcss-loader
   - modules： 模块化css
3. less-loader
4. postcss-loader
   - postcss.config.js

### plugins
* 当webpack运行到一定时刻时，做一些事情。就如生命周期一样
  
1. html-webpack-plugin
   - 打包之后，自动生成html，并自动引入打包过后的js
   - template：加入
2. clean-webpack-plugin
   - 打包之前，先删除之前的打包文件

### source-map
* 是一个映射关系，它知道打包过后的js文件，对应src目录下的多少行，方便调试
1. development: cheap-module-eval-source-map
2. product: cheap-module-source-map

### webpack-dev-server
* 打包生成的文件放在内存里面
1. open
2. compress
3. proxy: 跨域代理
4. contentBase
5. hot
6. historyApiFallback：  单页应用路由问题，使用HTML5历史记录API时，线上环境需要后端nginx配置

### Hot Module Replacement 模块热替换
1. devServer.hot设置true
2. new webpack.HotModuleReplacementPlugin()
3. 编写需要更新的模块代码
```js
    if (module.hot) {
        module.hot.accept('./print.js', function() {
            console.log('Accepting the updated printMe module!');
            printMe();
        })
    }
```
4. css-loader, bable等已经做了相应的处理，很多时候不需要写。

### babel-loader
1. es6语法转化
   - "@babel/preset-env"
2. react语法支持
   - "@babel/preset-react"
3. 可以写在babel-loader的options里，也可以写在.babelrc文件里
4. 从右往左执行，先转react，再进行es6转es5

### Tree Shaking
1. 移除 JavaScript 上下文中的未引用代码(dead-code);
2. 只支持es module
3. optimization.usedExports = true
4. pakeage.json.sideEffects = []

### devlopment和production环境区分打包
1. devlopment
    - cheap-module-eval-source-map
    - new Webpack.HotModuleReplacementPlugin()
    - devServer
    - optimization.usedExports = true
2. production
    - cheap-module-source-map
3. common 
    - entry
    - output
    - module
    - new HtmlWebpackPlugin(), new CleanWebpackPlugin(),

### code splitting
1. 拆分代码成多个小文件，浏览器并行加载，提升性能
2. 代码分割，和webpack无关
3. webpack中实现代码分割有两种方式
    - 同步代码：只需在webpack.common.js中做optimization.splitChunks.chunks = 'all'
    - 异步代码：无需配置，自动进行代码分割
4. splitchunks
   - chunks默认async
```js
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                // priority 越大优先级越高
                priority: -10,
                filename: 'vendors.js'
              },
              default: false
            }
        }
    },
```

### 懒加载，Prefetching/Preloading
1. 异步代码提升性能
2. 同步缓存代码的性能提升是有限的
3. 提高代码利用率提升性能
4. Preloading
   - 通过缓存，第一次引入的js过大，代码利用率低
5. Prefetching
   - 浏览器会在**空闲**的时候，下载main.js, 并缓存到disk。当有页面使用的时候，直接从disk缓存中读取
   - 代码利用率高
6. preloading缓存，只是提高了第二次加载的速度。但是会降低第一次加载的速度
7. 写高性能的js时，考虑的不是缓存的问题，而是考虑代码使用率。 控制台：command+shift+p

### 打包分析
1. webpack --profile --json > stats.json

### css代码分割
1. MiniCssExtractPlugin
2. OptimizeCSSAssetsPlugin 压缩css

### 浏览器缓存
1. output中fileName加入 [contenthash],文件改动contenthash就会改变，如果不变则使用缓存的js

### shimming垫片
```js
    new webpack.ProvidePlugin({
        '$': 'jquery'
    }),
```
### 环境变量的使用

### eslint
1. npx eslint --init
2. eslint-loader会影响打包速度

### webpack性能优化
1. 升级node，npm，yarn
2. 缩小loader使用范围，使用include，exclude
3. 少使用plugin，且确保plugin可靠
4. 配置resolve
5. **第三方模块打包优化** 
    - 1. 第三方模块只打包一次
    - 2. 引入第三方模块dll
6. **多进程 happypack，使用多个cpu**
7. 合理使用source-map




