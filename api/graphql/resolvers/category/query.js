const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const category = baseResolver.createResolver(async (root, args, context) => {
  return context.models.category.getOne(args)
})

const categories = baseResolver.createResolver(async (root, args, context) => {
  return context.models.category.getMany(args, args.limit, args.skip)
})

module.exports = {
  Query: {
    category,
    categories,
  },
}
