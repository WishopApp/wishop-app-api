import { baseResolver } from '../root/resolver'

const user = baseResolver.createResolver(
  async (root, args, context) => {
    return context.user.getUser(args)
  }
)

const users = baseResolver.createResolver(
  async (root, args, context) => {
    return context.user.getUsers(args, args.limit, args.skip)
  }
)

const createUser = baseResolver.createResolver(
  async (root, args, context) => {
    return context.user.createUser(args)
  }
)

export default {
  Query: {
    user,
    users
  },
  Mutation: {
    createUser
  }
}
