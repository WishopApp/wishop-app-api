const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const product = baseResolver.createResolver(
  async (root, args, context) => {
    return context.product.getOne(args)
  }
)

const products = baseResolver.createResolver(
  async (root, args, context) => {
    return context.product.getMany(args.limit, args.skip)
  }
)

module.exports = {
  Query: {
    product,
    products
  }
}
