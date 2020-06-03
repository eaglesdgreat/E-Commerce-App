const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

config = {
    name: "server",
    entry: [
        path.join('./server/server.js')
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
            }
        ]
    }
}

module.exports = config