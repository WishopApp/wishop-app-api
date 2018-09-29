const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const storesSchema = mongoose.Schema(
  {
    userId: { type: ObjectId, ref: 'users', require: true },
    name: { type: String, require: true, unique: true },
    coverUrl: String,
    avatarUrl: String,
    description: String,
    storeBranchIds: [{ type: ObjectId, ref: 'store_branches', require: true }],
    status: {
      type: String,
      enum: ['OPEN', 'CLOSED', 'BANNED'],
      require: true,
      default: 'OPEN',
    },
  },
  {
    timestamps: true,
    collection: 'stores',
  }
)

const storeModel = mongoose.model('StoresModel', storesSchema)

class Store {
  async getMany(args) {
    const stores = await storeModel.find(args)
    return stores
  }

  async getOne(args) {
    const store = await storeModel.findOne(args)
    return store
  }

  async getById(_id) {
    const store = await storeModel.findOne({ _id })
    return store
  }

  async getStoreStatistic(args) {
    let filterOpen = { status: 'OPEN' }
    let filterClosed = { status: 'CLOSED' }
    let filterBanned = { status: 'BANNED' }

    if (args.storeId) {
      filterOpen._id = args.storeId
      filterClosed._id = args.storeId
      filterBanned._id = args.storeId
    }

    const open = await storeModel.find(filterOpen).count()
    const closed = await storeModel.find(filterClosed).count()
    const banned = await storeModel.find(filterBanned).count()

    return {
      open,
      closed,
      banned,
      total: open + closed + banned,
    }
  }

  async create(args) {
    const store = await storeModel.create(args)
    return store
  }
}

module.exports = Store
