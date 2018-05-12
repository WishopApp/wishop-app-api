const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const user = baseResolver.createResolver(
  async (root, args, context) => {
    return context.user.getOne(args)
  }
)

const users = baseResolver.createResolver(
  async (root, args, context) => {
    return context.user.getMany(args, args.limit, args.skip)
  }
)

module.exports = {
  Query: {
    user,
    users
  }
}