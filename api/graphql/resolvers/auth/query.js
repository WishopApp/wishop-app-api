const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const currentUser = baseResolver.createResolver(async (root, args, context) => {
  return context.models.user.getOne({ _id: context.user._id })
})

module.exports = {
  Query: {
    currentUser,
  },
}
