const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    mode: "development",
    devtool: false,
    entry: "./src/index.js", // 就是 entry: { main: "./src/index.js" } 的语法糖
    output: {
        publicPath: "http://localhost:3000/",
        //hotUpdateGlobal:'webpackHotUpdate',
        //chunkLoadingGlobal: 'webpackChunk'
    },
    // Top await，这个是webpack5的语法, 为了可以在顶部使用await引入返回promise的模块：Const xxx = await import(“xxx”)
    experiments: {
        topLevelAwait: true
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        }),
        new ModuleFederationPlugin({
            filename: "remoteEntry.js",
            name: "teamb",
            exposes: {
                "./Dropdown": "./src/Dropdown.js",
                "./Button": "./src/Button.js",
            },
            shared: ["is-array"] // 共享模块
        })
    ]
}