const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const login = baseResolver.createResolver(async (root, args, context) => {
  return context.models.user.login(args)
})

const adminLogin = baseResolver.createResolver(async (root, args, context) => {
  return context.models.user.adminLogin(args)
})

module.exports = {
  Mutation: {
    login,
    adminLogin,
  },
}
