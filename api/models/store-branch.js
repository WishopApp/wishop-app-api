const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const storeBranchesSchema = mongoose.Schema(
  {
    storeId: { type: ObjectId, ref: 'stores', require: true },
    name: { type: String, require: true, unique: true },
    telNo: { type: String, require: true },
    beaconToken: String
  },
  {
    timestamp: true,
    collection: 'store_branches'
  }
)

const storeBranchModel = mongoose.model('StoreBranchesModel', storeBranchesSchema)

class StoreBranch {
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

  async getById (_id) {
    const storeBranch = await storeBranchModel.findOne({ _id })
    return storeBranch
  }

  async getByBeaconToken (beaconToken) {
    const storeBranch = await storeBranchModel.findOne({ beaconToken })
    return storeBranch
  }

  async create (args) {
    const storeBranch = await storeBranchModel.create(args)
    return storeBranch
  }
}

module.exports = StoreBranch