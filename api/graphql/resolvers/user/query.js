const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const user = baseResolver.createResolver(async (root, args, context) => {
  return context.models.user.getOne(args)
})

const users = baseResolver.createResolver(async (root, args, context) => {
  return context.models.user.getMany(args, args.limit, args.skip)
})

const userStatistic = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.user.getUserStatistic(args)
  }
)

module.exports = {
  Query: {
    user,
    users,
    userStatistic,
  },
}
