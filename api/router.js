const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { formatError } = require('apollo-errors')
const bodyParser = require('body-parser')

const schema = require('./schema')
const models = require('./libaries/model-loader')

const router = express.Router()

router.use('/graphql', bodyParser.json(), graphqlExpress({
  formatError,
  schema,
  context: models,
  tracing: true,
  cacheControl: {
    defaultMaxAge: 5
  }
}))

router.get('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

module.exports = router
