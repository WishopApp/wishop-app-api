const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const beacon = baseResolver.createResolver(async (root, args, context) => {
  return context.models.beacon.getOne(args)
})

const beacons = baseResolver.createResolver(async (root, args, context) => {
  return context.models.beacon.getMany(args)
})

const beaconStatistic = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.beacon.getStatistic()
  }
)

module.exports = {
  Query: {
    beacon,
    beacons,
    beaconStatistic,
  },
}
