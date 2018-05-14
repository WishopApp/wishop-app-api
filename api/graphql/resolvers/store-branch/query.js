const { baseResolver } = require('../../../libaries/apollo-resolver-creator')
const { isThisStoreShouldCheck } = require('../../../libaries/wishlist-matched-percentage')

const storeBranch = baseResolver.createResolver(
  async (root, args, context) => {
    const store = await context.storeBranch.getOne(args)
    store.shouldCheck = false // WAITING FOR NEXT FEATURE
    return store
  }
)

const storeBranches = baseResolver.createResolver(
  async (root, args, context) => {
    return context.storeBranch.getMany(args, args.limit, args.skip)
  }
)

const searchStoreBranch = baseResolver.createResolver(
  async (root, args, context) => {
    const storeBranch = await context.storeBranch.getByBeaconToken(args.beaconToken)
    const { wishlist } = await context.user.getById(args.userId)
    const products = await context.product.getStoreProducts(storeBranch.storeId)

    storeBranch.shouldCheck = isThisStoreShouldCheck(wishlist, products)
    return storeBranch
  }
)

module.exports = {
  Query: {
    storeBranch,
    storeBranches,
    searchStoreBranch
  }
}
