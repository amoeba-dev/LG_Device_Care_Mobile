const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const development = require("./webpack.config");

module.exports = (env, options) => {
    const dev = development(env, options);
    return {
        entry: dev.entry,
        module: dev.module,
        resolve: dev.resolve,
        plugins: [
            new Dotenv({ path: `./env/${options.stage}.env` }),
            new MiniCssExtractPlugin({
                filename: "style.css",
                chunkFilename: "[id].css",
            }),
            new webpack.DefinePlugin({
                "require.specified": "require.resolve",
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "./public/index.html"),
                favicon: path.join(__dirname, "./public/favicon.ico"),
                inject: false,
                filename: path.join(__dirname, "./build/index.html"),
            }),
            new CopyPlugin({
                patterns: [{ from: "./public/assets", to: "assets" }],
            }),
        ],
        output: {
            path: path.join(__dirname, "./", "build"),
            filename: "bundle.js",
            publicPath: "./",
        },
        devtool: "source-map",
        performance: { hints: false },
    };
};
