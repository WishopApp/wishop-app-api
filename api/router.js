const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { formatError } = require('apollo-errors')
const bodyParser = require('body-parser')

const schema = require('./schema')
const models = require('./libaries/model-loader')
const { getUserFromToken } = require('./libaries/token-manager')

const router = express.Router()

router.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(async (req, res) => {
    let user = null

    if (req.headers.authorization) {
      try {
        user = getUserFromToken(req.headers.authorization)
      } catch (err) {
        res.clearCookie(process.env.AUTH_TOKEN_NAME)
      }
    }

    return {
      formatError,
      schema,
      context: {
        models,
        user,
      },
      tracing: true,
      cacheControl: {
        defaultMaxAge: 5,
      },
    }
  })
)

router.get(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  })
)

module.exports = router
