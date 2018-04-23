import { baseResolver } from '../root/resolver'

const subCategory = baseResolver.createResolver(
  async (root, args, context) => {
    return context.subCategory.getOne(args)
  }
)

const subCategories = baseResolver.createResolver(
  async (root, args, context) => {
    return context.subCategory.getMany(args, args.limit, args.skip)
  }
)

const createSubCategory = baseResolver.createResolver(
  async (root, args, context) => {
    return context.subCategory.create(args)
  }
)

const properties = baseResolver.createResolver(
  async (subCategory, args, context) => {
    return context.subCategoryProp.getBySubCategoryId(subCategory._id)
  }
)

export default {
  Query: {
    subCategory,
    subCategories
  },
  Mutation: {
    createSubCategory
  },
  SubCategory: {
    properties
  }
}
