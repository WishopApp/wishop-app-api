const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createStoreBranch = baseResolver.createResolver(
  async (root, args, context) => {
    if (!context.user) {
      throw new Error('Authentication is required.')
    }

    const staffAccount = {
      email: args.staffUsername,
      password: args.staffPassword,
      role: 'STORE_STAFF',
    }

    await context.models.user.create(staffAccount)

    return context.models.storeBranch.create(args)
  }
)

module.exports = {
  Mutation: {
    createStoreBranch,
  },
}
