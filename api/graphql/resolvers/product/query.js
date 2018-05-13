const { baseResolver } = require('../../../libaries/apollo-resolver-creator')
// const { productWithRecommendation } = require('../../../libaries/wishlist-matched-percentage')

const product = baseResolver.createResolver(
  async (root, args, context) => {
    return context.product.getOne(args)
  }
)

const products = baseResolver.createResolver(
  async (root, args, context) => {
    return context.product.getMany(args.limit, args.skip)
  }
)

const searchByKeyword = baseResolver.createResolver(
  async (root, args, context) => {
    const products = await context.product.getByNameLike(args.keyword)
    return products
  }
)

module.exports = {
  Query: {
    product,
    products,
    searchByKeyword
  }
}
