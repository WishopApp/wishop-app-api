const { baseResolver } = require('../../root/resolver')

const categoryProp = baseResolver.createResolver(
  async (root, args, context) => {
    return context.categoryProp.getOne(args)
  }
)

const categoryProps = baseResolver.createResolver(
  async (root, args, context) => {
    return context.categoryProp.getMany(args, args.limit, args.skip)
  }
)

const createCategoryProp = baseResolver.createResolver(
  async (root, args, context) => {
    return context.categoryProp.create(args)
  }
)

module.exports = {
  Query: {
    categoryProp,
    categoryProps
  },
  Mutation: {
    createCategoryProp
  }
}
