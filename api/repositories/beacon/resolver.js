const { baseResolver } = require('../../root/resolver')

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

const createBeacon = baseResolver.createResolver(
  async (root, args, context) => {
    return context.beacon.create(args)
  }
)

module.exports = {
  Query: {
    beacon,
    beacons
  },
  Mutation: {
    createBeacon
  }
}
