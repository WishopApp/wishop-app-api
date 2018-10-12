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

const categoryProps = baseResolver.createResolver(
  async (product, args, context) => {
    if (product.categoryProps.length === 0) {
      console.log('zero')
      return []
    }

    return product.categoryProps.map(async cp => {
      const cateProp = await context.models.categoryProp.getOne({
        _id: cp.propId,
      })
      return {
        _id: cp._id,
        name: cateProp.name,
        value: cp.value,
      }
    })
  }
)

const subCategoryProps = baseResolver.createResolver(
  async (product, args, context) => {
    if (product.subCategoryProps.length === 0) {
      console.log('zero sub')
      return []
    }

    return product.subCategoryProps.map(async cp => {
      const subCateProp = await context.models.subCategoryProp.getOne({
        _id: cp.propId,
      })
      return {
        _id: cp._id,
        name: subCateProp.name,
        value: cp.value,
      }
    })
  }
)

module.exports = {
  Product: {
    store,
    storeBranch,
    category,
    subCategory,
    categoryProps,
    subCategoryProps,
  },
}
