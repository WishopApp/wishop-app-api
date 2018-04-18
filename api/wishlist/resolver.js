import { baseResolver } from '../root/resolver'

const createWishlist = baseResolver.createResolver(
  async (root, args, context) => {
    return context.user.update(
      {
        _id: args.userId
      },
      {
        $set: {
          wishlistProducts: args.wishlist
        }
      }
    )
  }
)

const createWishlistSet = baseResolver.createResolver(
  async (root, args, context) => {
    return context.user.update(
      {
        _id: args.userId
      },
      {
        $set: {
          wishlistSets: args.wishlistSet
        }
      }
    )
  }
)

export default {
  Mutation: {
    createWishlist,
    createWishlistSet
  }
}
