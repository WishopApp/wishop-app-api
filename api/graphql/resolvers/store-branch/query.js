const { baseResolver } = require('../../../libaries/apollo-resolver-creator')
const {
  isThisStoreShouldCheck,
} = require('../../../libaries/wishlist-matched-percentage')

const storeBranch = baseResolver.createResolver(async (root, args, context) => {
  const store = await context.models.storeBranch.getOne(args)
  store.shouldCheck = false // WAITING FOR NEXT FEATURE
  return store
})

const storeBranches = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.storeBranch.getMany(args, args.limit, args.skip)
  }
)

const searchStoreBranchFromBeacon = baseResolver.createResolver(
  async (root, args, context) => {
    const beaconAssignThisBranch = context.models.beacon.getOne({
      _id: args.beaconId,
    })

    const storeBranch = context.models.storeBranch.getOne({
      _id: beaconAssignThisBranch.assignId,
    })
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
