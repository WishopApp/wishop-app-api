import { baseResolver } from '../../root/resolver'

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
    const subCategories = category.subCategoryIds.map(async id => {
      const subCategory = await context.subCategory.getById(id)
      return subCategory
    })
    return subCategories
  }
)

export default {
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
