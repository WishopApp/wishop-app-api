import { baseResolver } from '../root/resolver'

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

export default {
  Query: {
    category,
    categories
  },
  Mutation: {
    createCategory
  }
}
