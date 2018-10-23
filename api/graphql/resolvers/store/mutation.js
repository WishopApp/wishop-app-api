const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createStore = baseResolver.createResolver(async (root, args, context) => {
  const store = await context.models.store.create(args)
  context.models.user.update({ _id: args.ownerId, storeId: store._id })
  context.models.storeBranch.create({ storeId: store._id, name: 'Main' })
  return store
})

module.exports = {
  Mutation: {
    createStore,
  },
}
