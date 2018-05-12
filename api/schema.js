const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = require('./graphql/types')
const resolvers = require('./graphql/resolvers')

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = executableSchema
