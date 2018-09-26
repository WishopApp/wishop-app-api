const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createCategory = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.category.create(args)
  }
)

const updateCategory = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.category.update(args)
  }
)

module.exports = {
  Mutation: {
    createCategory,
    updateCategory,
  },
}
