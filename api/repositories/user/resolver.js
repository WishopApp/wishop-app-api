const { baseResolver } = require('../../root/resolver')

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

const createUser = baseResolver.createResolver(
  async (root, args, context) => {
    return context.user.create(args)
  }
)

module.exports = {
  Query: {
    user,
    users
  },
  Mutation: {
    createUser
  }
}
