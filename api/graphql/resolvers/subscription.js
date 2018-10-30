const { withFilter } = require('graphql-subscriptions')
const pubsub = require('../../libaries/pubsub')

module.exports = {
  Subscription: {
    storeDetected: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('storeDetected'),
        (payload, args) => {
          return payload.storeBranchId === args.storeBranchId
        }
      ),
    },
  },
}
