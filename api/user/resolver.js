import { baseResolver } from '../root/resolver'

const user = baseResolver.createResolver(
  async (root, args, context) => {
    return 'Hello User'
  }
)

const users = baseResolver.createResolver(
  async (root, args, context) => {
    return 'Hello Users'
  }
)

const createUser = baseResolver.createResolver(
  async (root, args, context) => {
    return 'User Created'
  }
)

export default {
  Query: {
    user,
    users
  }
}
