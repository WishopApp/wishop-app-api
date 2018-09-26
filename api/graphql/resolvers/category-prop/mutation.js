const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createCategoryProp = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.categoryProp.create(args)
  }
)

const updateCategoryProp = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.categoryProp.update(args)
  }
)

module.exports = {
  Mutation: {
    createCategoryProp,
    updateCategoryProp,
  },
}
