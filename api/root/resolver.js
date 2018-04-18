import { createResolver } from 'apollo-resolvers'
import { createError, isInstance } from 'apollo-errors'

const ResolverErrorIntferface = createError('ResolverError', {
  message: 'Error has been occured in resolver.',
  data: { code: 2000 },
  options: { showPath: true, showLocations: true }
})

export const ResolverError = (error) => new ResolverErrorIntferface({
  data: { message: error }
})

export const baseResolver = createResolver(
  null,
  (root, args, context, error) => (
    isInstance(error) ? error : console.log(error)
  )
)
