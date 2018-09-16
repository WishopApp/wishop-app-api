const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createSubCategory = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.subCategory.create(args)
  }
)

module.exports = {
  Mutation: {
    createSubCategory,
  },
}
