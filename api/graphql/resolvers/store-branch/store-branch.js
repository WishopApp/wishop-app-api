const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const store = baseResolver.createResolver(
  async (storeBranch, args, context) => {
    return context.models.store.getById(storeBranch.storeId)
  }
)

const products = baseResolver.createResolver(
  async (storeBranch, args, context) => {
    return context.models.product.getBranchProduct(storeBranch._id)
  }
)

module.exports = {
  StoreBranch: {
    store,
    products,
  },
}
