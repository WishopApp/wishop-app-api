const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createProduct = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.product.create(args)
  }
)

module.exports = {
  Mutation: {
    createProduct,
  },
}
