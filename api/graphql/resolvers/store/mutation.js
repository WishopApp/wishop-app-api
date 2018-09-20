const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createStore = baseResolver.createResolver(async (root, args, context) => {
  return context.models.store.create(args)
})

module.exports = {
  Mutation: {
    createStore,
  },
}
