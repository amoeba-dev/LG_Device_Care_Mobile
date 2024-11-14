const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, options) => {
    return {
        entry: ["./src/index.js"],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.scss$/,
                    use: ["style-loader", "css-loader", "sass-loader"],
                },
                {
                    test: /\.(png|jpg|gif|ico|mp3)(\?v=\d+\.\d+\.\d+)?$/,
                    use: { loader: "url-loader?limit=100000" },
                },
                {
                    test: /\.json$/,
                    exclude: /node_modules/,
                    use: { loader: "json-loader" },
                    type: "javascript/auto",
                },
                {
                    test: /\.(eot|com|ttf|woff|woff2|otf)(\?v=\d+\.\d+\.\d+)?$/,
                    use: {
                        loader: "url-loader?limit=10000&mimetype=application/octet-stream",
                    },
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    use: { loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
                },
            ],
        },
        resolve: {
            alias: {
                "@util": path.join(__dirname, "./src/Utils"),
                "@component": path.join(__dirname, "./src/Components"),
                "@config": path.join(__dirname, "./src/Config"),
                "@layout": path.join(__dirname, "./src/Layouts"),
                "@hook": path.join(__dirname, "./src/Hooks"),
                "@resources": path.join(__dirname, "./src/Resources"),
                "@lang": path.join(__dirname, "./src/Lang"),
            },
        },
        plugins: [
            new Dotenv({ path: `./env/${options.stage}.env` }),
            new MiniCssExtractPlugin({
                filename: "style.css",
                chunkFilename: "[id].css",
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                "require.specified": "require.resolve",
            }),
            new webpack.NamedModulesPlugin(),
        ],
        output: {
            path: __dirname + "/public",
            publicPath: "/",
            filename: "bundle.js",
            globalObject: "this",
        },
        devtool: "inline-source-map",
        devServer: {
            historyApiFallback: true,
            compress: true,
            publicPath: "/",
            contentBase: "./public",
            // hot: true,
            https: true,
            host: "192.168.0.50",
            port: 3007,
            proxy: {
                "/api": {
                    target: "https://kic-dev-lgcc-api.lgbusinesscloud.com",
                    // target: "https://kic-st-lgcc-api.lgbusinesscloud.com",
                    // target: "https://aic-dev-lgcc-api.lgbusinesscloud.com",
                    secure: true,
                    changeOrigin: true,
                    // pathRewrite: {
                    //     "^/api": "",
                    // },
                    withCredentials: true,
                    onProxyReq: function (proxyReq, req, res) {
                        proxyReq.setHeader("Cookie", req.headers.cookie);
                    },
                },
            },
        },
    };
};
