const { baseResolver } = require('../../../libaries/apollo-resolver-creator')
const isAdmin = require('../../../libaries/role-checker')

const createSubCategory = baseResolver.createResolver(
  async (root, args, context) => {
    if (!context.user) {
      throw new Error('Authentication is required.')
    }

    if (!isAdmin(context.user)) {
      throw new Error('Permission Denied.')
    }

    return context.models.subCategory.create(args)
  }
)

const updateSubCategory = baseResolver.createResolver(
  async (root, args, context) => {
    if (!context.user) {
      throw new Error('Authentication is required.')
    }

    if (!isAdmin(context.user)) {
      throw new Error('Permission Denied.')
    }

    return context.models.subCategory.update(args)
  }
)

module.exports = {
  Mutation: {
    createSubCategory,
    updateSubCategory,
  },
}
