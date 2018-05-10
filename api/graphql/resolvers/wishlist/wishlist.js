const { map } = require('lodash')

const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const category = baseResolver.createResolver(
  async (wishlist, args, context) => {
    return context.category.getOne({ _id: wishlist.categoryId })
  }
)

const subCategory = baseResolver.createResolver(
  async (wishlist, args, context) => {
    return context.subCategory.getById(wishlist.subCategoryId)
  }
)

const categoryProps = baseResolver.createResolver(
  async (wishlist, args, context) => {
    const { categoryProps } = wishlist

    if (categoryProps.length !== 0) {
      const categoryPropsWithName = map(categoryProps,
        async categoryProp => {
          const { value, categoryPropId } = categoryProp
          const { name } = await context.categoryProp.getById(categoryPropId)
          return {
            name: name,
            value: value
          }
        })
      return categoryPropsWithName
    }
  }
)

const subCategoryProps = baseResolver.createResolver(
  async (wishlist, args, context) => {
    const { subCategoryProps } = wishlist

    if (subCategoryProps.length !== 0) {
      const subCategoryPropsWithName = map(subCategoryProps,
        async subCategoryProp => {
          const { value, subCategoryPropId } = subCategoryProp
          const { name } = await context.subCategoryProp.getById(subCategoryPropId)
          return {
            name: name,
            value: value
          }
        })
      return subCategoryPropsWithName
    }
  }
)

module.exports = {
  Wishlist: {
    category,
    subCategory,
    categoryProps,
    subCategoryProps
  }
}
