const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: false,
    output: {
        publicPath: "http://localhost:8080/",
    },
    devServer: {
        port: 8080
    },
    experiments: {
        topLevelAwait: true
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: {
                loader: 'babel-loader',
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
        new WebpackFederationPlugin({
            filename: "remoteEntryRemote.js", // 构建出来的文件名
            name: "remoteVariable", // remote向外暴露的全局变量名
            remotes: {
                host: "hostVariable@http://localhost:8081/remoteEntryHost.js"
            },
            exposes: {
                "./NewsList": "./src/NewsList.jsx",
                "./title": "./src/title.js",
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
            shared: ["reccact", "react-dom"]
        })
    ]
};