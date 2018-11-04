const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const wishlist = baseResolver.createResolver(async (root, args, context) => {
  return context.models.wishlist.getOne(args)
})

module.exports = {
  Query: {
    wishlist,
  },
}
