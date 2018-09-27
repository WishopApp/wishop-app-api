const mongoose = require('mongoose')
const { omit } = require('lodash')

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

class Wishlist {
  async create(args) {
    const wishlist = await wishlistModel.create(args)
    return wishlist
  }

  async getMany(args, limit = 10, skip = 0) {
    const wishlists = await wishlistModel
      .find(args)
      .skip(skip)
      .limit(limit)
    return wishlists
  }

  async getOne(args) {
    const wishlist = await wishlistModel.findOne(args)
    return wishlist
  }

  async getById(_id) {
    const wishlist = await wishlistModel.findOne({ _id })
    return wishlist
  }

  async update(args) {
    const id = omit(args, ['_id'])
    const wishlist = await wishlistModel.findByIdAndUpdate(id, { $set: args })
    return wishlist
  }

  async remove(args) {
    const id = omit(args, ['_id'])
    const wishlist = await wishlistModel.findByIdAndRemove(id)
    return wishlist
  }
}

module.exports = Wishlist
