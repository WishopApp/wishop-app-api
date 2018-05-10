const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createStoreBranch = baseResolver.createResolver(
  async (root, args, context) => {
    return context.storeBranch.create(args)
  }
)

module.exports = {
  Mutation: {
    createStoreBranch
  }
}
