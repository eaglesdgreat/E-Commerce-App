import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import compress from 'compression'
import path from 'path'
import mongoose from 'mongoose'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { StaticRouter, matchPath } from 'react-router-dom'
import { SheetsRegistry, JssProvider, createGenerateId } from 'react-jss'
// import { MuiThemeProvider } from '@material-ui/core/styles'
// import { MongoClient } from 'mongodb'

import devBundle from './devBundle' // comment out for production environment
import template from './../template/template'
import config from './../config/config'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import swaggerRoutes from './routes/swagger.routes'
import App from './../client/App'
import SSRRoutes from './../client/routes' // SSR=> means Server Side Rendering
// import theme from './../styles/theme'

const app = express()
const options = {
  useCreateIndex: true, 
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}
mongoose.connect(config.mongoUri, options).then((conn) => conn).catch(console.error)
const db = mongoose.connection
db.once('open', () => {
  console.log('Connected to mongodb successfully')
})

// MongoClient.connect(url, options, (err, db) => {
//   console.log('Connected to mongodb successfully')
//   db.close()
// })

devBundle.compile(app) // comment out for production environment

app.use(bodyParser.json({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())
app.use(compress())
app.use(cors())
app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/api/v1', swaggerRoutes)

app.get('*', (req, res) => {
  const activeRoutes = SSRRoutes.find((route) => {
    return matchPath(req.url, route)
  })
  const promise = activeRoutes.fetchInitialData
    ? activeRoutes.fetchInitialData(req.url)
    : Promise.resolve()
  const sheetsRegistry = new SheetsRegistry()
  const generateId = createGenerateId()
  console.log(promise)

  promise.then((data) => {
    console.log(data)
    const context = {data}
    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <JssProvider registry={sheetsRegistry} generateId={generateId}>
          {/* <MuiThemeProvider theme={theme}> */}
          <App />
          {/* </MuiThemeProvider> */}
        </JssProvider>
      </StaticRouter>
    )

    if (context.url) {
      return res.redirect(303, context.url)
    }
    const css = sheetsRegistry.toString()
    res.status(200).send(template({ markup, data, css }))
  }).catch(err => { console.log(err) })
})

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: `${err.name}: ${err.message}`
    })
  }
})

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info(`Server running on port ${config.port}`)
})
