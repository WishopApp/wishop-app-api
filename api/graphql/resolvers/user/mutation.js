const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createUser = baseResolver.createResolver(
  async (root, args, context) => {
    return context.user.create(args)
  }
)

module.exports = {
  Mutation: {
    createUser
  }
}
