const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: false,
    devServer: {
        port: 8081
    },
    experiments:{
        topLevelAwait:true
    },
    output: {
        publicPath: "http://localhost:8081/",
        // publicPath: "http://localhost:8000/",
        // hotUpdateGlobal:'webpackHotUpdate'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-react"]
                }
            },
            exclude: /node_modules/
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html")
        }),
        new ModuleFederationPlugin({
            name: "hostVariable", // 暴露出去的全局变量名称
            filename: "remoteEntryHost.js",
            remotes: {
                remote: "remoteVariable@http://localhost:8080/remoteEntryRemote.js"
            },
            exposes: {
                "./Slides": "./src/Slides.jsx"
            },
            // shared配置主要是用来避免项目出现多个公共依赖
            // shared: {
            //     react: {
            //         singleton: true
            //     },
            //     "react-dom": {
            //         singleton: true
            //     },
            // }
            // 设置共享文件池，只会加载一次
            shared:['react','react-dom']
        })
    ]
};