const { baseResolver } = require('../../../libaries/apollo-resolver-creator')

const createBeacon = baseResolver.createResolver(
  async (root, args, context) => {
    return context.beacon.create(args)
  }
)

module.exports = {
  Mutation: {
    createBeacon
  }
}
