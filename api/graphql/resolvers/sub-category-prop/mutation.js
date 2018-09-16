const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createSubCategoryProp = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.subCategoryProp.create(args)
  }
)

module.exports = {
  Mutation: {
    createSubCategoryProp,
  },
}
