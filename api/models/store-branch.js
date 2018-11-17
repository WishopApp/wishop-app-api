const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const storeBranchesSchema = mongoose.Schema(
  {
    storeId: { type: ObjectId, ref: 'stores', require: true },
    name: { type: String, require: true },
    telNo: { type: String },
    productIds: [{ type: ObjectId, ref: 'products' }],
    staffUsername: { type: String },
    status: {
      type: String,
      enum: ['OPEN', 'CLOSED', 'BANNED'],
      default: 'OPEN',
    },
  },
  {
    timestamps: true,
    collection: 'store_branches',
  }
)

const storeBranchModel = mongoose.model(
  'StoreBranchesModel',
  storeBranchesSchema
)

class StoreBranch {
  async getMany(args) {
    const storeBranches = await storeBranchModel.find(args)
    return storeBranches
  }

  async getOne(args) {
    const storeBranch = await storeBranchModel.findOne(args)
    return storeBranch
  }

  async getById(_id) {
    const storeBranch = await storeBranchModel.findOne({ _id })
    return storeBranch
  }

  async create(args) {
    const storeBranch = await storeBranchModel.create(args)
    return storeBranch
  }
}

module.exports = StoreBranch
