const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createStoreBranch = baseResolver.createResolver(
  async (root, args, context) => {
    if (!context.user) {
      throw new Error('Authentication is required.')
    }

    return context.models.storeBranch.create(args)
  }
)

module.exports = {
  Mutation: {
    createStoreBranch,
  },
}
