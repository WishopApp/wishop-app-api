import { baseResolver } from '../../root/resolver'

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

const createStoreBranch = baseResolver.createResolver(
  async (root, args, context) => {
    return context.storeBranch.create(args)
  }
)

const store = baseResolver.createResolver(
  async (storeBranch, args, context) => {
    return context.store.getById(storeBranch.storeId)
  }
)

export default {
  Query: {
    storeBranch,
    storeBranches,
    searchStoreBranch
  },
  Mutation: {
    createStoreBranch
  },
  StoreBranch: {
    store
  }
}
