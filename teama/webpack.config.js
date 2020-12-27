const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackFederationModule = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: false,
    output: {
        publicPath: "http://localhost:8000/",
        hotUpdateGlobal:'webpackHotUpdate'
    },
    target:['es6','web'],
    experiments:{
        topLevelAwait:true
    },
    devServer: {
        port: 8000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html")
        }),
        new WebpackFederationModule({
            name: "teama",
            filename: "remoteEntry.js",
            remotes: {
                teamb: "teamb@http://localhost:3000/remoteEntry.js"
            },
            shared: ["is-array"]
        })
    ]
};