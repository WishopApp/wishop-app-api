import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import bodyParser from 'body-parser'

import schema from './schema'

import { Users } from './user/model'

const router = express.Router()

router.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {
    user: new Users()
  }
}))

router.get('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

export default router
