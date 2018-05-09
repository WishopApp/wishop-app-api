const { makeExecutableSchema } = require('graphql-tools')
const { combineResolvers } = require('apollo-resolvers')

const rootSchema = require('./root/schema')
const userSchema = require('./repositories/user/schema')
const categorySchema = require('./repositories/category/schema')
const subCategorySchema = require('./repositories/subCategory/schema')
const categoryPropsSchema = require('./repositories/categoryProperty/schema')
const subCategoryPropSchema = require('./repositories/subCategoryProperty/schema')
const wishlistSchema = require('./repositories/wishlist/schema')
const beaconSchema = require('./repositories/beacon/schema')
const storeSchema = require('./repositories/store/schema')
const storeBranchSchema = require('./repositories/storeBranch/schema')

const userResolvers = require('./repositories/user/resolver')
const categoryResolvers = require('./repositories/category/resolver')
const subCategoryResolvers = require('./repositories/subCategory/resolver')
const categoryPropResolvers = require('./repositories/categoryProperty/resolver')
const subCategoryPropResolvers = require('./repositories/subCategoryProperty/resolver')
const wishlistResolvers = require('./repositories/wishlist/resolver')
const beaconResolvers = require('./repositories/beacon/resolver')
const storeResolvers = require('./repositories/store/resolver')
const storeBranchResolvers = require('./repositories/storeBranch/resolver')

const typeDefs = [
  ...rootSchema,
  ...userSchema,
  ...categorySchema,
  ...subCategorySchema,
  ...categoryPropsSchema,
  ...subCategoryPropSchema,
  ...wishlistSchema,
  ...beaconSchema,
  ...storeSchema,
  ...storeBranchSchema
]

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
