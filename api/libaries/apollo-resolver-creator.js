const { createResolver } = require('apollo-resolvers')
const { createError, isInstance } = require('apollo-errors')

const ResolverErrorIntferface = createError('ResolverError', { message: '' })

exports.ResolverError = (error) => new ResolverErrorIntferface({
  message: 'Error has been occured in resolver.',
  data: {
    code: 2000,
    message: error
  },
  options: {
    showPath: true
  }
})

exports.baseResolver = createResolver(
  null,
  (root, args, context, error) => (
    isInstance(error) ? error : console.log(error)
  )
)
