import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const storeBranchesSchema = mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    telNo: { type: String, require: true },
    staffId: { type: ObjectId, ref: 'store_staffs' }
  },
  {
    timestamp: true,
    collection: 'store_branches'
  }
)

const storeBranchModel = mongoose.model('StoreBranchesModel', storeBranchesSchema)

export class Store {
  async getMany (args, limit = 10, skip = 0) {
    const storeBranches = await storeBranchModel.find(args)
      .skip(skip)
      .limit(limit)
    return storeBranches
  }
}
