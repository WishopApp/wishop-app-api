const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const category = baseResolver.createResolver(
  async (root, args, context) => {
    return context.category.getOne(args)
  }
)

const categories = baseResolver.createResolver(
  async (root, args, context) => {
    return context.category.getMany(args, args.limit, args.skip)
  }
)

module.exports = {
  Query: {
    category,
    categories
  }
}
