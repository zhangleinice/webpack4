
// 如果不用webpack-dev-server，可以用node自己起一个服务器

const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');

const complier = webpack(config);

const app = express();

app.use(webpackDevMiddleware(complier, {
    // publicPath: '/'
}))

app.listen(3000, () => {
    console.log("server is running!");
})
