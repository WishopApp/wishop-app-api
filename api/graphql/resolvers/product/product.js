const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const store = baseResolver.createResolver(
  async (product, args, context) => {
    return context.store.getById(product.storeId)
  }
)

const storeBranch = baseResolver.createResolver(
  async (product, args, context) => {
    return context.storeBranch.getById(product.storeBranchId)
  }
)

const category = baseResolver.createResolver(
  async (product, args, context) => {
    return context.category.getById(product.categoryId)
  }
)

const subCategory = baseResolver.createResolver(
  async (product, args, context) => {
    return context.subCategory.getById(product.subCategoryId)
  }
)

module.exports = {
  Product: {
    store,
    storeBranch,
    category,
    subCategory
  }
}
