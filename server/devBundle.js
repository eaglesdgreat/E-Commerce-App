import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackClientConfig from './../webpack.config.client'

const compile = (app) => {
    if(process.env.NODE_ENV === 'development') {
        const compiler = webpack(webpackClientConfig)
        const middleware = webpackMiddleware(compiler, {
            publicPath: webpackClientConfig.output.publicPath
        })
        app.use(middleware)
        app.use(webpackHotMiddleware(compiler))
    }
}

export default {
    compile
}