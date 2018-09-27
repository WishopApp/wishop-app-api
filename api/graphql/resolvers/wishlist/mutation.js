const {
  baseResolver,
  ResolverError,
} = require('../../../libaries/apollo-resolver-creator')

const createWishlist = baseResolver.createResolver(
  async (root, args, context) => {
    try {
      return context.models.wishlist.create(args)
    } catch (error) {
      return new ResolverError(error)
    }
  }
)

const updateWishlist = baseResolver.createResolver(
  async (root, args, context) => {
    try {
      return context.models.wishlist.update(args)
    } catch (error) {
      return new ResolverError(error)
    }
  }
)

const removeWishlist = baseResolver.createResolver(
  async (root, args, context) => {
    try {
      return context.models.wishlist.remove(args)
    } catch (error) {
      return new ResolverError(error)
    }
  }
)

module.exports = {
  Mutation: {
    createWishlist,
    updateWishlist,
    removeWishlist,
  },
}
