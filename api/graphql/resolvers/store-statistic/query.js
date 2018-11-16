const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const storeBranchStatistic = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.storeStatistic.getOne(args)
  }
)
module.exports = {
  Query: {
    storeBranchStatistic,
  },
}
