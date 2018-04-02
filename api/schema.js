import { makeExecutableSchema } from 'graphql-tools'
import { combineResolvers } from 'apollo-resolvers'

import rootSchema from './root/schema'
import userSchema from './user/schema'
import categorySchema from './category/schema'

import userResolvers from './user/resolver'
import categoryResolvers from './category/resolver'

const typeDefs = [
  ...rootSchema,
  ...userSchema,
  ...categorySchema
]

const resolvers = combineResolvers([
  userResolvers,
  categoryResolvers
])

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default executableSchema
