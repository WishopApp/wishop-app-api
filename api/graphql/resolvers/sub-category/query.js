const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const subCategory = baseResolver.createResolver(async (root, args, context) => {
  return context.models.subCategory.getOne(args)
})

const subCategories = baseResolver.createResolver(async (root, args, context) => {
  return context.models.subCategory.getMany(args, args.limit, args.skip)
})

const category = baseResolver.createResolver(async (subCategory, args, context) => {
  return context.models.category.getOne({ _id: subCategory.categoryId })
})

module.exports = {
  Query: {
    subCategory,
    subCategories,
  },
  SubCategory: {
    category,
  },
}
