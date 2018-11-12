const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const owner = baseResolver.createResolver(async (store, args, context) => {
  return context.models.user.getOne({ _id: store.ownerId })
})

const beacons = baseResolver.createResolver(async (store, args, context) => {
  return context.models.beacon.getMany({ assignId: store._id })
})

const products = baseResolver.createResolver(async (store, args, context) => {
  return context.models.product.getManyNoDelete({ storeId: store._id })
})

const branchs = baseResolver.createResolver(async (store, args, context) => {
  return context.models.storeBranch.getMany({ storeId: store._id })
})

module.exports = {
  Store: {
    owner,
    beacons,
    products,
    branchs,
  },
}
