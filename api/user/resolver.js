import { baseResolver } from '../root/resolver'

const user = baseResolver.createResolver(
  async (root, args, context) => {
    return context.user.getOne(args)
  }
)

const users = baseResolver.createResolver(
  async (root, args, context) => {
    return context.user.getMany(args, args.limit, args.skip)
  }
)

const createUser = baseResolver.createResolver(
  async (root, args, context) => {
    return context.user.create(args)
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
