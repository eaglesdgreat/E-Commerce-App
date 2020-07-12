const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

config = {
    name: "server",
    entry: [
        path.join(__dirname, 'server/server.js')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.generated.js',
        publicPath: '/dist/'
    },
    target: "node",
    externals: [nodeExternals()],
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\ya?ml$/,
                type: 'json',
                use: {
                    loader: 'yaml-loader'
                }
            },
            {
                test: /\.(jpe?g|png|svg|gif|jpg)$/i,
                use: {
                    loader: "file-loader?name=images/[name].[ext]"
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: false
        })
    ]
}

module.exports = config