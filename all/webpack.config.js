const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: false,
    devServer: {
        port: 9000
    },
    experiments: {
        topLevelAwait: true
    },
    output: {
        publicPath: "http://localhost:9000/"
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-react"]
                },
            },
            exclude: /node_modules/
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html")
        }),
        new ModuleFederationPlugin({
            filename: "remoteEntryAll.js",
            name: "all",
            remotes: {
                remote: "remoteVariable@http://localhost:8080/remoteEntryRemote.js",
                host: "hostVariable@http://localhost:8081/remoteEntryHost.js"
            },
            // shared配置主要是用来避免项目出现多个公共依赖
            shared: {
                react: {
                    singleton: true
                },
                "react-dom": {
                    singleton: true
                },
            }
        })
    ]
};