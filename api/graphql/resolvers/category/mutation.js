const { baseResolver } = require('../../../libaries/apollo-resolver-creator')
const isAdmin = require('../../../libaries/role-checker')

const createCategory = baseResolver.createResolver(
  async (root, args, context) => {
    if (!context.user) {
      throw new Error('Authentication is required.')
    }

    if (!isAdmin(context.user)) {
      throw new Error('Permission Denied.')
    }

    return context.models.category.create(args)
  }
)

const updateCategory = baseResolver.createResolver(
  async (root, args, context) => {
    if (!context.user) {
      throw new Error('Authentication is required.')
    }

    if (!isAdmin(context.user)) {
      throw new Error('Permission Denied.')
    }

    return context.models.category.update(args)
  }
)

module.exports = {
  Mutation: {
    createCategory,
    updateCategory,
  },
}
