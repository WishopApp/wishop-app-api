import { baseResolver } from '../root/resolver'

const createWishlist = baseResolver.createResolver(
  async (root, args, context) => {
    const { userId, wishlist } = args
    return context.user.updateUserWishlist(userId, wishlist)
  }
)

const createWishlistSet = baseResolver.createResolver(
  async (root, args, context) => {
    const { userId, wishlistSet } = args
    return context.user.updateUserById(userId, wishlistSet)
  }
)

export default {
  Mutation: {
    createWishlist,
    createWishlistSet
  }
}
