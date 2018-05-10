const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createProduct = baseResolver.createResolver(
  async (root, args, context) => {
    return context.product.create(args)
  }
)

module.exports = {
  Mutation: {
    createProduct
  }
}
