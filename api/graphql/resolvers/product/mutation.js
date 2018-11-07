const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createProduct = baseResolver.createResolver(
  async (root, args, context) => {
    if (!context.user) {
      throw new Error('Authentication is required.')
    }

    return context.models.product.create(args)
  }
)

const updateProduct = baseResolver.createResolver(
  async (root, args, context) => {
    if (!context.user) {
      throw new Error('Authentication is required.')
    }

    return context.models.product.update(args)
  }
)

module.exports = {
  Mutation: {
    createProduct,
    updateProduct,
  },
}
