import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import bodyParser from 'body-parser'

import schema from './schema'

import { User } from './user/model'
import { Category } from './category/model'
import { SubCategory } from './subCategory/model'
import { CategoryProp } from './categoryProperty/model'
import { SubCategoryProp } from './SubCategoryProperty/model'

const router = express.Router()

router.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {
    user: new User(),
    category: new Category(),
    subCategory: new SubCategory(),
    categoryProp: new CategoryProp(),
    subCategoryProp: new SubCategoryProp()
  },
  tracing: true,
  cacheControl: {
    defaultMaxAge: 30
  }
}))

router.get('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

export default router
