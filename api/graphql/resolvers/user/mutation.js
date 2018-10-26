const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createUser = baseResolver.createResolver(async (root, args, context) => {
  return context.models.user.create(args)
})

const updateUser = baseResolver.createResolver(async (root, args, context) => {
  return context.models.user.update(args)
})

module.exports = {
  Mutation: {
    createUser,
    updateUser,
  },
}
