import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { ApolloEngine } from 'apollo-engine'

import router from './router'
import './libaries/mongoose'

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
