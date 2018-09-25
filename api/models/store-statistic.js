const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const storesStatisticSchema = mongoose.Schema(
  {
    storeBranchId: { type: ObjectId, ref: 'store_branch', require: true },
    reachCount: [
      {
        date: String,
        count: Number,
      },
    ],
    categoryRanking: [
      {
        categoryId: { type: ObjectId, ref: 'stores', require: true },
        count: Number,
      },
    ],
    recentCustomers: [
      {
        wishlistId: { type: ObjectId, ref: 'wishlists', require: true },
        visitAt: String,
      },
    ],
  },
  {
    timestamp: true,
    collection: 'stores_statistic',
  }
)

const storesStatisticModel = mongoose.model(
  'StoresStatisticModel',
  storesStatisticSchema
)

class Store {
  async getMany(args, limit = 10, skip = 0) {
    const stores = await storesStatisticModel
      .find(args)
      .skip(skip)
      .limit(limit)
    return stores
  }

  async getOne(args) {
    const store = await storesStatisticModel.findOne(args)
    return store
  }

  async getById(_id) {
    const store = await storesStatisticModel.findOne({ _id })
    return store
  }

  async create(args) {
    const store = await storesStatisticModel.create(args)
    return store
  }
}

module.exports = Store
