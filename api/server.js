const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { ApolloEngine } = require('apollo-engine')
const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')

const schema = require('./schema')

require('dotenv').config()

const router = require('./router')
require('./libaries/mongoose')

require('./libaries/pubsub')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use('/', router)

const ws = createServer(app)
ws.listen(process.env.APP_PORT, () => {
  console.log(
    `GraphQL Server is now running on http://localhost:${process.env.APP_PORT}`
  )
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server: ws,
      path: '/subscriptions',
    }
  )
})

// const engine = new ApolloEngine({
//   apiKey: process.env.APOLLO_ENGINE_APIKEY,
// })

// engine.listen({
//   port: process.env.APP_PORT,
//   expressApp: ws,
// })

module.exports = ws
