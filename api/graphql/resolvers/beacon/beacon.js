const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const history = baseResolver.createResolver(async (beacon, args, context) => {
  return context.models.beaconHistory.getAll({ beaconId: beacon._id })
})

const store = baseResolver.createResolver(
  async (beaconTicket, args, context) => {
    return context.models.store.getOne({ _id: beaconTicket.storeId })
  }
)

module.exports = {
  Beacon: {
    history,
  },
  BeaconTicket: {
    store,
  },
}
