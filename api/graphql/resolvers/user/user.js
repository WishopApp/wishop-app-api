const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const wishlist = baseResolver.createResolver(async (user, args, context) => {
  return context.models.category.getAllByUserId(user._id)
})

module.exports = {
  User: {
    wishlist,
  },
}
