const { withFilter } = require('graphql-subscriptions')
const pubsub = require('../../libaries/pubsub')

module.exports = {
  Subscription: {
    storeDetected: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('storeDetected'),
        (payload, args) => {
          console.log('payload', typeof payload._id)
          console.log('args', typeof args.storeId)

          return payload._id.toString() === args.storeId
        }
      ),
    },
  },
}
