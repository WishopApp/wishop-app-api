const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { ApolloEngine } = require('apollo-engine')

const router = require('./router')
require('./libaries/mongoose')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use('/', router)

const engine = new ApolloEngine({
  apiKey: process.env.APOLLO_ENGINE_APIKEY
})

engine.listen({
  port: process.env.APP_PORT,
  expressApp: app
})
