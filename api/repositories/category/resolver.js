const { baseResolver } = require('../../root/resolver')

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

const createCategory = baseResolver.createResolver(
  async (root, args, context) => {
    return context.category.create(args)
  }
)

const properties = baseResolver.createResolver(
  async (category, args, context) => {
    return context.categoryProp.getByCategoryId(category._id)
  }
)

const subCategories = baseResolver.createResolver(
  async (category, args, context) => {
    return context.subCategory.getByCategoryId(category._id)
  }
)

module.exports = {
  Query: {
    category,
    categories
  },
  Mutation: {
    createCategory
  },
  Category: {
    properties,
    subCategories
  }
}
