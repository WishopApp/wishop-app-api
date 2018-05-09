const { makeExecutableSchema } = require('graphql-tools')
const { combineResolvers } = require('apollo-resolvers')

const userResolvers = require('./repositories/user/resolver')
const categoryResolvers = require('./repositories/category/resolver')
const subCategoryResolvers = require('./repositories/subCategory/resolver')
const categoryPropResolvers = require('./repositories/categoryProperty/resolver')
const subCategoryPropResolvers = require('./repositories/subCategoryProperty/resolver')
const wishlistResolvers = require('./repositories/wishlist/resolver')
const beaconResolvers = require('./repositories/beacon/resolver')
const storeResolvers = require('./repositories/store/resolver')
const storeBranchResolvers = require('./repositories/storeBranch/resolver')

const typeDefs = require('./types')

const resolvers = combineResolvers([
  userResolvers,
  categoryResolvers,
  subCategoryResolvers,
  categoryPropResolvers,
  subCategoryPropResolvers,
  wishlistResolvers,
  beaconResolvers,
  storeResolvers,
  storeBranchResolvers
])

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = executableSchema
