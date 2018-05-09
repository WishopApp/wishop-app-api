import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { formatError } from 'apollo-errors'
import bodyParser from 'body-parser'

import schema from './schema'

import { User } from './repositories/user/model'
import { Category } from './repositories/category/model'
import { SubCategory } from './repositories/subCategory/model'
import { CategoryProp } from './repositories/categoryProperty/model'
import { SubCategoryProp } from './repositories/subCategoryProperty/model'
import { Store } from './repositories/store/model'
import { Beacon } from './repositories/beacon/model'
import { StoreBranch } from './repositories/storeBranch/model'

const router = express.Router()

router.use('/graphql', bodyParser.json(), graphqlExpress({
  formatError,
  schema,
  context: {
    user: new User(),
    category: new Category(),
    subCategory: new SubCategory(),
    categoryProp: new CategoryProp(),
    subCategoryProp: new SubCategoryProp(),
    store: new Store(),
    storeBranch: new StoreBranch(),
    beacon: new Beacon()
  },
  tracing: true,
  cacheControl: {
    defaultMaxAge: 5
  }
}))

router.get('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

export default router
