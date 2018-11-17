const { baseResolver } = require('../../../libaries/apollo-resolver-creator')
const isAdmin = require('../../../libaries/role-checker')

const REGISTER_MESSAGE = 'Registered in system.'
const UPDATE_TO_IDLE_MESSAGE = `Change status to "IDLE"`
const UPDATE_TO_EXPIRE_MESSAGE = `Change status to "EXPIRE"`
const ASSIGN_TO_STORE_MESSAGE = 'Assign to '

const IDLE_TYPE = 'IDLE'
const ASSIGN_TYPE = 'ASSIGN'
const EXPIRE_TYPE = 'EXPIRE'

const createBeacon = baseResolver.createResolver(
  async (root, args, context) => {
    if (!context.user) {
      throw new Error('Authentication is required.')
    }

    if (!isAdmin(context.user)) {
      throw new Error('Permission Denied.')
    }

    const beacon = await context.models.beacon.create(args)
    await context.models.beaconHistory.create({
      beaconId: beacon._id,
      title: REGISTER_MESSAGE,
      type: IDLE_TYPE,
    })
  }
)

const assignBeaconToStore = baseResolver.createResolver(
  async (root, args, context) => {
    if (!context.user) {
      throw new Error('Authentication is required.')
    }

    if (!isAdmin(context.user)) {
      throw new Error('Permission Denied.')
    }

    args.status = 'INUSE'
    const beacon = await context.models.beacon.update(args)
    const storeBranch = await context.models.storeBranch.getOne({
      _id: args.assignId,
    })
    const store = await context.models.store.getOne({
      _id: storeBranch.storeId,
    })
    await context.models.beaconHistory.create({
      beaconId: args._id,
      title: `${ASSIGN_TO_STORE_MESSAGE}"${store.name}:${storeBranch.name}"`,
      type: ASSIGN_TYPE,
    })
    return beacon
  }
)

const assignBeaconToProduct = baseResolver.createResolver(
  async (root, args, context) => {
    if (!context.user) {
      throw new Error('Authentication is required.')
    }

    if (!isAdmin(context.user)) {
      throw new Error('Permission Denied.')
    }

    args.status = 'INUSE'
    const beacon = await context.models.beacon.update(args)
    const product = await context.models.product.getOne({ _id: args.assignId })
    await context.models.beaconHistory.create({
      beaconId: args._id,
      title: `${ASSIGN_TO_STORE_MESSAGE}"${product.name}"`,
    })
    return beacon
  }
)

const updateBeacon = baseResolver.createResolver(
  async (root, args, context) => {
    if (!context.user) {
      throw new Error('Authentication is required.')
    }

    if (!isAdmin(context.user)) {
      throw new Error('Permission Denied.')
    }

    const beacon = await context.models.beacon.update(args)

    if (args.status) {
      let title = UPDATE_TO_IDLE_MESSAGE
      let type = IDLE_TYPE

      if (args.status === 'EXPIRE') {
        title = UPDATE_TO_EXPIRE_MESSAGE
        type = EXPIRE_TYPE
      }

      await context.models.beaconHistory.create({
        beaconId: beacon._id,
        title,
        type,
      })
    }

    return beacon
  }
)

const createBeaconTicket = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.beaconRequestTickets.create(args)
  }
)

const updateBeaconTicket = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.beaconRequestTickets.update(args)
  }
)

module.exports = {
  Mutation: {
    createBeacon,
    assignBeaconToStore,
    assignBeaconToProduct,
    updateBeacon,
    createBeaconTicket,
    updateBeaconTicket,
  },
}
