const path = require('path')
const webpack = require('webpack')

config = {
    name: "browser",
    entry: {
        main: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            './client/main.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    mode: "development",
    devtool: "#source-map",
    target: "web",
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    emitWarning: true,
                    failOnError: false,
                    failOnWarning: false
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }, 
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devServer: {
        historyApiFallback: true
    }
}

module.exports = config