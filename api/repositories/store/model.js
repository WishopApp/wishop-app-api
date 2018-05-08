import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const storesSchema = mongoose.Schema(
  {
    ownerId: { type: ObjectId, ref: 'users' },
    name: { type: String, require: true, unique: true },
    coverUrl: String,
    avatarUrl: String,
    description: String
    // branchIds: [{ type: ObjectId, ref: 'store_branches' }],
    // productIds: [{ type: ObjectId, ref: 'products' }],
    // promoBannerIds: [{ type: ObjectId, ref: 'store_promotion_banners' }]
  },
  {
    timestamp: true,
    collection: 'stores'
  }
)

const storeModel = mongoose.model('StoresModel', storesSchema)

export class Store {
  async getMany (args, limit = 10, skip = 0) {
    const stores = await storeModel.find(args)
      .skip(skip)
      .limit(limit)
    return stores
  }
}
