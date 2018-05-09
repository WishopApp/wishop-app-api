import { baseResolver } from '../../root/resolver'

const storeBranch = baseResolver.createResolver(
  async (root, args, context) => {
    return context.storeBranch.getOne(args)
  }
)

const storeBranches = baseResolver.createResolver(
  async (root, args, context) => {
    return context.storeBranch.getMany(args, args.limit, args.skip)
  }
)

export default {
  Query: {
    storeBranch,
    storeBranches
  }
}
