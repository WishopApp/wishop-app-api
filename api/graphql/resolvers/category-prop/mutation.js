const { baseResolver } = require('../../../libaries/apollo-resolver-creator')
const isAdmin = require('../../../libaries/role-checker')

const createCategoryProp = baseResolver.createResolver(
  async (root, args, context) => {
    if (!context.user) {
      throw new Error('Authentication is required.')
    }

    if (!isAdmin(context.user)) {
      throw new Error('Permission Denied.')
    }

    return context.models.categoryProp.create(args)
  }
)

const updateCategoryProp = baseResolver.createResolver(
  async (root, args, context) => {
    if (!context.user) {
      throw new Error('Authentication is required.')
    }

    if (!isAdmin(context.user)) {
      throw new Error('Permission Denied.')
    }

    return context.models.categoryProp.update(args)
  }
)

module.exports = {
  Mutation: {
    createCategoryProp,
    updateCategoryProp,
  },
}
