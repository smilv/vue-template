const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");
module.exports = {
    mode: "development",
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "../build"),
        filename: "static/js/[name].[chunkhash:8].js"
    },
    resolve: {
        extensions: [".js", ".vue", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: [MiniCssExtractPlugin.loader, "css-loader", "px2rem-loader", "postcss-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 10000
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../index.html"),
            inject: true
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "static/css/main.[contenthash:8].css"
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "all",
                    test: /node_modules/,
                    minSize: 0,
                    minChunks: 1,
                    priority: -10
                },
                common: {
                    chunks: "all",
                    minSize: 0,
                    minChunks: 2,
                    priority: -20
                }
            }
        }
    }
};
