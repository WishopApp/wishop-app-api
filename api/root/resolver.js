import { createResolver } from 'apollo-resolvers'
import { createError, isInstance } from 'apollo-errors'

const ResolverErrorIntferface = createError('ResolverError', { message: '' })

export const ResolverError = (error) => new ResolverErrorIntferface({
  message: 'Error has been occured in resolver.',
  data: {
    code: 2000,
    message: error
  },
  options: {
    showPath: true
  }
})

export const baseResolver = createResolver(
  null,
  (root, args, context, error) => (
    isInstance(error) ? error : console.log(error)
  )
)
