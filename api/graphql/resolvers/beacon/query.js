const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const beacon = baseResolver.createResolver(
  async (root, args, context) => {
    return context.beacon.getOne(args)
  }
)

const beacons = baseResolver.createResolver(
  async (root, args, context) => {
    return context.beacon.getMany(args)
  }
)

module.exports = {
  Query: {
    beacon,
    beacons
  }
}
