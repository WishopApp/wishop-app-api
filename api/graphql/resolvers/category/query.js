const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const category = baseResolver.createResolver(async (root, args, context) => {
  return context.models.category.getOne(args)
})

const categories = baseResolver.createResolver(async (root, args, context) => {
  return context.models.category.getMany(args, args.limit, args.skip)
})

const subCategories = baseResolver.createResolver(async (category, args, context) => {
  return context.models.subCategory.getMany({ categoryId: category._id })
})

module.exports = {
  Query: {
    category,
    categories,
  },
  Category: {
    subCategories,
  },
}
