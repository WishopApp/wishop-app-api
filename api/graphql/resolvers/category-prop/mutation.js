const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createCategoryProp = baseResolver.createResolver(
  async (root, args, context) => {
    return context.categoryProp.create(args)
  }
)

module.exports = {
  Mutation: {
    createCategoryProp
  }
}
