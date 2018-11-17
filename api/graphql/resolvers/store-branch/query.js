const { baseResolver } = require('../../../libaries/apollo-resolver-creator')
const pubsub = require('../../../libaries/pubsub')

const storeBranch = baseResolver.createResolver(async (root, args, context) => {
  const store = await context.models.storeBranch.getOne(args)
  return store
})

const storeBranches = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.storeBranch.getMany(args)
  }
)

const searchStoreBranchFromBeacon = baseResolver.createResolver(
  async (root, args, context) => {
    const beaconAssignThisBranch = await context.models.beacon.getOne({
      uuid: args.uuid,
    })

    if (!beaconAssignThisBranch) {
      return null
    }

    const storeBranch = await context.models.storeBranch.getOne({
      _id: beaconAssignThisBranch.assignId,
    })

    const wishlists = await context.models.wishlist.getMany({
      userId: args.userId,
    })

    if (storeBranch) {
      await Promise.all(
        wishlists.map(async wishlist => {
          wishlist.category = await context.models.category.getOne({
            _id: wishlist.categoryId,
          })

          wishlist.subCategory = await context.models.subCategory.getOne({
            _id: wishlist.subCategoryId,
          })
        })
      )

      const payload = {
        storeDetected: wishlists,
        storeBranchId: storeBranch._id.toString(),
      }

      pubsub.publish('storeDetected', payload)

      const oldStatistic = await context.models.storeStatistic.getOne({
        storeBranchId: storeBranch._id,
      })

      if (!oldStatistic) {
        const newStatistic = await context.models.storeStatistic.create({
          storeBranchId: storeBranch._id,
        })

        await context.models.storeStatistic.update(newStatistic._id, wishlists)
      }

      await context.models.storeStatistic.update(oldStatistic._id, wishlists)
    }

    return storeBranch
  }
)

module.exports = {
  Query: {
    storeBranch,
    storeBranches,
    searchStoreBranchFromBeacon,
  },
}
