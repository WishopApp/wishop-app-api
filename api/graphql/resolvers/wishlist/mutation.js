const { baseResolver, ResolverError } = require('../../../libaries/apollo-resolver-creator')

const createWishlist = baseResolver.createResolver(
  async (root, args, context) => {
    const { userId, wishlist } = args
    try {
      return context.user.createWishlist(userId, wishlist)
    } catch (error) {
      return new ResolverError(error)
    }
  }
)

const updateWishlist = baseResolver.createResolver(
  async (root, args, context) => {
    const { userId, wishlistId, wishlist } = args
    try {
      return context.user.updateWishlist(userId, wishlistId, wishlist)
    } catch (error) {
      return new ResolverError(error)
    }
  }
)

const removeWishlist = baseResolver.createResolver(
  async (root, args, context) => {
    const { userId, wishlistId } = args
    try {
      return context.user.removeWishlist(userId, wishlistId)
    } catch (error) {
      return new ResolverError(error)
    }
  }
)

module.exports = {
  Mutation: {
    createWishlist,
    updateWishlist,
    removeWishlist
  }
}
