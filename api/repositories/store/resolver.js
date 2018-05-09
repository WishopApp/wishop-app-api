import { baseResolver } from '../../root/resolver'

const store = baseResolver.createResolver(
  async (root, args, context) => {
    return context.store.getOne(args)
  }
)

const stores = baseResolver.createResolver(
  async (root, args, context) => {
    return context.store.getMany(args, args.limit, args.skip)
  }
)

const createStore = baseResolver.createResolver(
  async (root, args, context) => {
    return context.store.create(args)
  }
)

export default {
  Query: {
    store,
    stores
  },
  Mutation: {
    createStore
  }
}
