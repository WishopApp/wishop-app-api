import { baseResolver } from '../../root/resolver'

const beacon = baseResolver.createResolver(
  async (root, args, context) => {
    return context.beacon.getOne(args)
  }
)

const beacons = baseResolver.createResolver(
  async (root, args, context) => {
    return context.beacon.getMany(args)
  }
)

export default {
  Query: {
    beacon,
    beacons
  }
}
