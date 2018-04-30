import { baseResolver } from '../root/resolver'

const createWishlist = baseResolver.createResolver(
  async (root, args, context) => {
    const { userId, wishlist } = args
    return context.user.updateUserWishlist(userId, wishlist)
  }
)

export default {
  Mutation: {
    createWishlist
  }
}
