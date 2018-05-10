const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const storeBranch = baseResolver.createResolver(
  async (root, args, context) => {
    return context.storeBranch.getOne(args)
  }
)

const storeBranches = baseResolver.createResolver(
  async (root, args, context) => {
    return context.storeBranch.getMany(args, args.limit, args.skip)
  }
)

const searchStoreBranch = baseResolver.createResolver(
  async (root, args, context) => {
    return context.storeBranch.getByBeaconToken(args.beaconToken)
  }
)

module.exports = {
  Query: {
    storeBranch,
    storeBranches,
    searchStoreBranch
  }
}
