const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const owner = baseResolver.createResolver(
  async (store, args, context) => {
    return context.user.getById(store.ownerId)
  }
)

module.exports = {
  Store: {
    owner
  }
}