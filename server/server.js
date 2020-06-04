import express from 'express'
import path from 'path'
import {MongoClient} from 'mongodb'

import devBundle from './devBundle' // comment out for production environment
import template from '../template/template'

const app = express()
let port = 3080
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/onlineMall'
const options = { useUnifiedTopology: true }
MongoClient.connect(url, options, (err, db) => {
    console.log('Connected to mongodb successfully')
    db.close()
})

devBundle.compile(app) // comment out for production environment

app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
    res.status(200).send(template())
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})