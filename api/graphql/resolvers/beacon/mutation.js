const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createBeacon = baseResolver.createResolver(
  async (root, args, context) => {
    return context.models.beacon.create(args)
  }
)

module.exports = {
  Mutation: {
    createBeacon,
  },
}
