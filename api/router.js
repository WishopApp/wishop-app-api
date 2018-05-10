const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { formatError } = require('apollo-errors')
const bodyParser = require('body-parser')

const schema = require('./schema')

const { User } = require('./models/user')
const { Category } = require('./models/category')
const { SubCategory } = require('./models/subCategory')
const { CategoryProp } = require('./models/categoryProp')
const { SubCategoryProp } = require('./models/subCategoryProp')
const { Store } = require('./models/store')
const { Beacon } = require('./models/beacon')
const { StoreBranch } = require('./models/storeBranch')

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
