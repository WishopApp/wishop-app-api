const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { ApolloEngine } = require('apollo-engine')
const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
require('dotenv').config()

require('./libaries/mongoose')
require('./libaries/pubsub')
const schema = require('./schema')
const router = require('./router')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(
  '*',
  cors({ origin: `https://dev-api-wishopapp.tk:${process.env.APP_PORT}` })
)

app.use('/', router)

// Create WebSocket listener server
const websocketServer = createServer(app)

// Bind it to port and start listening
websocketServer.listen(process.env.APP_PORT, () => {
  console.log(
    `Websocket Server is now running on http://localhost:${
      process.env.APP_PORT
    }`
  )

  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server: websocketServer,
      path: '/subscriptions',
    }
  )
})

// const engine = new ApolloEngine({
//   apiKey: process.env.APOLLO_ENGINE_APIKEY,
// })

// engine.listen({
//   port: process.env.APP_PORT,
//   expressApp: app,
// })
