const { baseResolver } = require('../../root/resolver')

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

const owner = baseResolver.createResolver(
  async (store, args, context) => {
    return context.user.getById(store.ownerId)
  }
)

module.exports = {
  Query: {
    store,
    stores
  },
  Mutation: {
    createStore
  },
  Store: {
    owner
  }
}
