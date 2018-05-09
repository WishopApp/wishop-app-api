const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { formatError } = require('apollo-errors')
const bodyParser = require('body-parser')

const schema = require('./schema')

const { User } = require('./repositories/user/model')
const { Category } = require('./repositories/category/model')
const { SubCategory } = require('./repositories/subCategory/model')
const { CategoryProp } = require('./repositories/categoryProperty/model')
const { SubCategoryProp } = require('./repositories/subCategoryProperty/model')
const { Store } = require('./repositories/store/model')
const { Beacon } = require('./repositories/beacon/model')
const { StoreBranch } = require('./repositories/storeBranch/model')

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

module.exports = router
