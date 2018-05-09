const { map } = require('lodash')

const { baseResolver, ResolverError } = require('../../root/resolver')

const createWishlist = baseResolver.createResolver(
  async (root, args, context) => {
    const { userId, wishlist } = args
    try {
      return context.user.createWishlist(userId, wishlist)
    } catch (error) {
      return new ResolverError(error)
    }
  }
)

const updateWishlist = baseResolver.createResolver(
  async (root, args, context) => {
    const { userId, wishlistId, wishlist } = args
    try {
      return context.user.updateWishlist(userId, wishlistId, wishlist)
    } catch (error) {
      return new ResolverError(error)
    }
  }
)

const removeWishlist = baseResolver.createResolver(
  async (root, args, context) => {
    const { userId, wishlistId } = args
    try {
      return context.user.removeWishlist(userId, wishlistId)
    } catch (error) {
      return new ResolverError(error)
    }
  }
)

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
  Mutation: {
    createWishlist,
    updateWishlist,
    removeWishlist
  },
  Wishlist: {
    category,
    subCategory,
    categoryProps,
    subCategoryProps
  }
}
