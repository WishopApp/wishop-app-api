const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const store = baseResolver.createResolver(async (root, args, context) => {
  return context.models.store.getOne(args)
})

const stores = baseResolver.createResolver(async (root, args, context) => {
  return context.models.store.getMany(args, args.limit, args.skip)
})

module.exports = {
  Query: {
    store,
    stores,
  },
}
