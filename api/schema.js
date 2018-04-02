import { makeExecutableSchema } from 'graphql-tools'
import { combineResolvers } from 'apollo-resolvers'

import rootSchema from './root/schema'
import userSchema from './user/schema'

import userResolvers from './user/resolver'

const typeDefs = [
  ...rootSchema,
  ...userSchema
]

const resolvers = combineResolvers([
  userResolvers
])

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default executableSchema
