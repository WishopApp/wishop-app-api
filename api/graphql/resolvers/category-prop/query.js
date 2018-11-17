const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const categoryProp = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.categoryProp.getOne(args)
  }
)

const categoryProps = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.categoryProp.getMany(args, args.limit, args.skip)
  }
)

module.exports = {
  Query: {
    categoryProp,
    categoryProps,
  },
}
