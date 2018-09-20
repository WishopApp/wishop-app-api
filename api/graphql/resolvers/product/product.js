const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const store = baseResolver.createResolver(async (product, args, context) => {
  return context.models.store.getById(product.storeId)
})

const storeBranch = baseResolver.createResolver(
  async (product, args, context) => {
    return context.models.storeBranch.getById(product.storeBranchId)
  }
)

const category = baseResolver.createResolver(async (product, args, context) => {
  return context.models.category.getById(product.categoryId)
})

const subCategory = baseResolver.createResolver(
  async (product, args, context) => {
    return context.models.subCategory.getById(product.subCategoryId)
  }
)

module.exports = {
  Product: {
    store,
    storeBranch,
    category,
    subCategory,
  },
}
