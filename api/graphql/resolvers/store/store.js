const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const owner = baseResolver.createResolver(async (store, args, context) => {
  return context.models.user.getById(store.ownerId)
})

const beacons = baseResolver.createResolver(async (store, args, context) => {
  return context.models.beacon.getAllByStoreId(store._id)
})

module.exports = {
  Store: {
    owner,
    beacons,
  },
}
