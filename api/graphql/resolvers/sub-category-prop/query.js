const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const subCategoryProp = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.subCategoryProp.getOne(args)
  }
)

const subCategoryProps = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.subCategoryProp.getMany(args, args.limit, args.skip)
  }
)

module.exports = {
  Query: {
    subCategoryProp,
    subCategoryProps,
  },
}
