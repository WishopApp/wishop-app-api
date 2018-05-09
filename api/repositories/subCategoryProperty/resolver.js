const { baseResolver } = require('../../root/resolver')

const subCategoryProp = baseResolver.createResolver(
  async (root, args, context) => {
    return context.subCategoryProp.getOne(args)
  }
)

const subCategoryProps = baseResolver.createResolver(
  async (root, args, context) => {
    return context.subCategoryProp.getMany(args, args.limit, args.skip)
  }
)

const createSubCategoryProp = baseResolver.createResolver(
  async (root, args, context) => {
    return context.subCategoryProp.create(args)
  }
)

module.exports = {
  Query: {
    subCategoryProp,
    subCategoryProps
  },
  Mutation: {
    createSubCategoryProp
  }
}
