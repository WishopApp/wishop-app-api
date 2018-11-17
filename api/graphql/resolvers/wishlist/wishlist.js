const { map } = require('lodash')

const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const category = baseResolver.createResolver(
  async (wishlist, args, context) => {
    return context.models.category.getOne({ _id: wishlist.categoryId })
  }
)

const subCategory = baseResolver.createResolver(
  async (wishlist, args, context) => {
    return context.models.subCategory.getOne({ _id: wishlist.subCategoryId })
  }
)

const categoryProps = baseResolver.createResolver(
  async (wishlist, args, context) => {
    const { categoryProps } = wishlist

    if (!categoryProps) {
      return []
    }

    if (categoryProps.length === 0) {
      return []
    }

    const categoryPropsWithName = map(categoryProps, async categoryProp => {
      const { value, categoryPropId } = categoryProp
      const { name } = await context.models.categoryProp.getById(categoryPropId)
      return {
        _id: categoryPropId,
        name: name,
        value: value,
      }
    })
    return categoryPropsWithName
  }
)

const subCategoryProps = baseResolver.createResolver(
  async (wishlist, args, context) => {
    const { subCategoryProps } = wishlist

    if (!subCategoryProps) {
      return []
    }

    if (subCategoryProps.length === 0) {
      return []
    }

    const subCategoryPropsWithName = map(
      subCategoryProps,
      async subCategoryProp => {
        const { value, subCategoryPropId } = subCategoryProp
        const { name } = await context.models.subCategoryProp.getById(
          subCategoryPropId
        )
        return {
          _id: subCategoryPropId,
          name: name,
          value: value,
        }
      }
    )
    return subCategoryPropsWithName
  }
)

module.exports = {
  Wishlist: {
    category,
    subCategory,
    categoryProps,
    subCategoryProps,
  },
}
