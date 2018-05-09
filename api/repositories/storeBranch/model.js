import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const storeBranchesSchema = mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    telNo: { type: String, require: true },
    beaconToken: { type: ObjectId, ref: 'beacons' }
  },
  {
    timestamp: true,
    collection: 'store_branches'
  }
)

const storeBranchModel = mongoose.model('StoreBranchesModel', storeBranchesSchema)

export class StoreBranch {
  async getMany (args, limit = 10, skip = 0) {
    const storeBranches = await storeBranchModel.find(args)
      .skip(skip)
      .limit(limit)
    return storeBranches
  }

  async getOne (args) {
    const storeBranch = await storeBranchModel.findOne(args)
    return storeBranch
  }

  async getByBeaconId (beaconId) {
    const storeBranch = await storeBranchModel.fineOne({ beaconId })
    return storeBranch
  }
}
