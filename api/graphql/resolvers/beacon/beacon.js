const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const history = baseResolver.createResolver(async (beacon, args, context) => {
  return context.models.beaconHistory.getAll({ beaconId: beacon._id })
})

module.exports = {
  Beacon: {
    history,
  },
}
