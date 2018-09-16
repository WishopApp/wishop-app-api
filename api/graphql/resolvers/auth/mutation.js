const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const login = baseResolver.createResolver(async (root, args, context) => {
  return context.models.user.login(args)
})

module.exports = {
  Mutation: {
    login,
  },
}
