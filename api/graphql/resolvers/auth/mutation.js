const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const login = baseResolver.createResolver(async (root, args, context) => {
  return context.models.user.login(args)
})

const adminLogin = baseResolver.createResolver(async (root, args, context) => {
  const user = await context.models.user.login(args)

  if (user.role !== 'ADMIN') {
    throw new Error('Authentication failed.')
  }

  return user
})

module.exports = {
  Mutation: {
    login,
    adminLogin,
  },
}
