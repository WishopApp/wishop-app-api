const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createCategory = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.category.create(args)
  }
)

module.exports = {
  Mutation: {
    createCategory,
  },
}
