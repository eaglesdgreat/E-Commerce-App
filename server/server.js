import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import compress from 'compression'
import path from 'path'
import mongoose from 'mongoose'
// import { MongoClient } from 'mongodb'

import devBundle from './devBundle' // comment out for production environment
import template from './../template/template'
import config from './../config/config'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import swaggerRoutes from './routes/swagger.routes'

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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet())
app.use(compress())
app.use(cors())
app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/api/v1', swaggerRoutes)

app.get('/', (req, res) => {
  res.status(200).send(template())
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
