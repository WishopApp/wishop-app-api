import { baseResolver } from '../../root/resolver'

const createWishlist = baseResolver.createResolver(
  async (root, args, context) => {
    const { userId, wishlist } = args
    return context.user.createWishlist(userId, wishlist)
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
    if (wishlist.categoryProps.length !== 0) {
      const categoryPropsWithName = wishlist.categoryProps.map(
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
    if (wishlist.subCategoryProps.length !== 0) {
      const subCategoryPropsWithName = wishlist.subCategoryProps.map(
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

export default {
  Mutation: {
    createWishlist
  },
  Wishlist: {
    category,
    subCategory,
    categoryProps,
    subCategoryProps
  }
}
