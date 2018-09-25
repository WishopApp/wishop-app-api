const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const wishlistsSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'users',
      require: true,
    },
    name: String,
    productName: String,
    categoryId: {
      type: ObjectId,
      ref: 'categories',
      require: true,
    },
    subCategoryId: {
      type: ObjectId,
      ref: 'sub_categories',
      require: true,
    },
    categoryProps: [
      {
        categoryPropId: {
          type: ObjectId,
          ref: 'category_props',
        },
        value: String,
      },
    ],
    subCategoryProps: [
      {
        subCategoryPropId: {
          type: ObjectId,
          ref: 'sub_category_props',
        },
        value: String,
      },
    ],
  },
  {
    timestamp: true,
    collection: 'wishlists',
  }
)

const wishlistModel = mongoose.model('WishlistModel', wishlistsSchema)

class Store {
  async getMany(args, limit = 10, skip = 0) {
    const stores = await wishlistModel
      .find(args)
      .skip(skip)
      .limit(limit)
    return stores
  }

  async getOne(args) {
    const store = await wishlistModel.findOne(args)
    return store
  }

  async getById(_id) {
    const store = await wishlistModel.findOne({ _id })
    return store
  }

  async create(args) {
    const store = await wishlistModel.create(args)
    return store
  }
}

module.exports = Store
