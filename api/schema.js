import { makeExecutableSchema } from 'graphql-tools'
import { combineResolvers } from 'apollo-resolvers'

import rootSchema from './root/schema'
import userSchema from './user/schema'
import categorySchema from './category/schema'
import subCategorySchema from './subCategory/schema'
import categoryPropsSchema from './categoryProperty/schema'
import subCategoryPropSchema from './SubCategoryProperty/schema'

import userResolvers from './user/resolver'
import categoryResolvers from './category/resolver'
import subCategoryResolvers from './subCategory/resolver'
import categoryPropResolvers from './categoryProperty/resolver'
import subCategoryPropResolvers from './SubCategoryProperty/resolver'

const typeDefs = [
  ...rootSchema,
  ...userSchema,
  ...categorySchema,
  ...subCategorySchema,
  ...categoryPropsSchema,
  ...subCategoryPropSchema
]

const resolvers = combineResolvers([
  userResolvers,
  categoryResolvers,
  subCategoryResolvers,
  categoryPropResolvers,
  subCategoryPropResolvers
])

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default executableSchema
