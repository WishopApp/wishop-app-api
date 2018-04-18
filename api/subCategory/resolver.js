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

export default {
  Query: {
    subCategory,
    subCategories
  },
  Mutation: {
    createSubCategory
  }
}
