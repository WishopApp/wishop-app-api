const { baseResolver } = require('../../../libaries/apollo-resolver-creator')
const isAdmin = require('../../../libaries/role-checker')

const createSubCategoryProp = baseResolver.createResolver(
  async (root, args, context) => {
    if (!context.user) {
      throw new Error('Authentication is required.')
    }

    if (!isAdmin(context.user)) {
      throw new Error('Permission Denied.')
    }

    return context.models.subCategoryProp.create(args)
  }
)

const updateSubCategoryProp = baseResolver.createResolver(
  async (root, args, context) => {
    if (!context.user) {
      throw new Error('Authentication is required.')
    }

    if (!isAdmin(context.user)) {
      throw new Error('Permission Denied.')
    }

    return context.models.subCategoryProp.update(args)
  }
)

module.exports = {
  Mutation: {
    createSubCategoryProp,
    updateSubCategoryProp,
  },
}
