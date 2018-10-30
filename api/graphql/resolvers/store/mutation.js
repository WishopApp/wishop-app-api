const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createStore = baseResolver.createResolver(async (root, args, context) => {
  const store = await context.models.store.create(args)
  await context.models.user.update({
    _id: args.ownerId,
    storeId: store._id,
    status: 'SHOP_OWNER',
  })
  await context.models.storeBranch.create({
    storeId: store._id,
    name: 'Main',
  })
  return store
})

module.exports = {
  Mutation: {
    createStore,
  },
}
