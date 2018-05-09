import { makeExecutableSchema } from 'graphql-tools'
import { combineResolvers } from 'apollo-resolvers'

import rootSchema from './root/schema'
import userSchema from './repositories/user/schema'
import categorySchema from './repositories/category/schema'
import subCategorySchema from './repositories/subCategory/schema'
import categoryPropsSchema from './repositories/categoryProperty/schema'
import subCategoryPropSchema from './repositories/subCategoryProperty/schema'
import wishlistSchema from './repositories/wishlist/schema'
import beaconSchema from './repositories/beacon/schema'
import storeSchema from './repositories/store/schema'
import storeBranchSchema from './repositories/storeBranch/schema'

import userResolvers from './repositories/user/resolver'
import categoryResolvers from './repositories/category/resolver'
import subCategoryResolvers from './repositories/subCategory/resolver'
import categoryPropResolvers from './repositories/categoryProperty/resolver'
import subCategoryPropResolvers from './repositories/subCategoryProperty/resolver'
import wishlistResolvers from './repositories/wishlist/resolver'
import beaconResolvers from './repositories/beacon/resolver'
import storeResolvers from './repositories/store/resolver'
import storeBranchResolvers from './repositories/storeBranch/resolver'

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

export default executableSchema
