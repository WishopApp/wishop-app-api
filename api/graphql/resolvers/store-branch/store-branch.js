const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const store = baseResolver.createResolver(
  async (storeBranch, args, context) => {
    return context.models.store.getById(storeBranch.storeId)
  }
)

module.exports = {
  StoreBranch: {
    store,
  },
}
