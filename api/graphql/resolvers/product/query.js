const { baseResolver } = require('../../../libaries/apollo-resolver-creator')
const {
  productWithRecommendation,
} = require('../../../libaries/wishlist-matched-percentage')

const product = baseResolver.createResolver(async (root, args, context) => {
  return context.models.product.getOne(args)
})

const products = baseResolver.createResolver(async (root, args, context) => {
  return context.models.product.getMany(args.limit, args.skip)
})

const searchByKeyword = baseResolver.createResolver(
  async (root, args, context) => {
    const products = await context.models.product.getByNameLike(args.keyword)
    return products
  }
)

const searchByWishlist = baseResolver.createResolver(
  async (root, args, context) => {
    const products = await context.models.product.getBySubCategoryId(
      args.wishlist.subCategoryId
    )
    const productsWithRec = productWithRecommendation(args.wishlist, products)
    return productsWithRec
  }
)

module.exports = {
  Query: {
    product,
    products,
    searchByKeyword,
    searchByWishlist,
  },
}
