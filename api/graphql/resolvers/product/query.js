const { baseResolver } = require('../../../libaries/apollo-resolver-creator')
const {
  productWithRecommendation,
} = require('../../../libaries/wishlist-matched-percentage')
const isAdmin = require('../../../libaries/role-checker')

const product = baseResolver.createResolver(async (root, args, context) => {
  let product = await context.models.product.getOne(args)
  return product
})

const products = baseResolver.createResolver(async (root, args, context) => {
  if (context.user) {
    if (isAdmin(context.user)) {
      return context.models.product.getManyWithDelete(args)
    }
  }

  return context.models.product.getManyNoDelete(args)
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

const productStatistic = baseResolver.createResolver(
  async (root, args, context) => {
    const products = await context.models.product.getProductStatistic(args)
    return products
  }
)

module.exports = {
  Query: {
    product,
    products,
    searchByKeyword,
    searchByWishlist,
    productStatistic,
  },
}
