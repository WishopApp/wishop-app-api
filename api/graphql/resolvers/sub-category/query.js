const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const subCategory = baseResolver.createResolver(async (root, args, context) => {
  return context.models.subCategory.getOne(args)
})

const subCategories = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.subCategory.getMany(args, args.limit, args.skip)
  }
)

module.exports = {
  Query: {
    subCategory,
    subCategories,
  },
}
