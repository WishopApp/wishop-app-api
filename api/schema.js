import { makeExecutableSchema } from 'graphql-tools'
import { combineResolvers } from 'apollo-resolvers'

import rootSchema from './root/schema'
import userSchema from './user/schema'
import categorySchema from './category/schema'
import subCategorySchema from './subCategory/schema'
import categoryPropsSchema from './categoryProperty/schema'
import subCategoryPropSchema from './SubCategoryProperty/schema'
import wishlistSchema from './Wishlist/schema'

import userResolvers from './user/resolver'
import categoryResolvers from './category/resolver'
import subCategoryResolvers from './subCategory/resolver'
import categoryPropResolvers from './categoryProperty/resolver'
import subCategoryPropResolvers from './SubCategoryProperty/resolver'
import wishlistResolvers from './Wishlist/resolver'

const typeDefs = [
  ...rootSchema,
  ...userSchema,
  ...categorySchema,
  ...subCategorySchema,
  ...categoryPropsSchema,
  ...subCategoryPropSchema,
  ...wishlistSchema
]

const resolvers = combineResolvers([
  userResolvers,
  categoryResolvers,
  subCategoryResolvers,
  categoryPropResolvers,
  subCategoryPropResolvers,
  wishlistResolvers
])

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default executableSchema
