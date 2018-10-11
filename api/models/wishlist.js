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
    timestamps: true,
    collection: 'wishlists',
  }
)

const wishlistModel = mongoose.model('WishlistModel', wishlistsSchema)

class Wishlist {
  async create(args) {
    const wishlistDataFromArgs = args.wishlist
    const dataForCreateWishlist = {
      userId: args.userId,
      ...wishlistDataFromArgs,
    }
    const wishlist = await wishlistModel.create(dataForCreateWishlist)
    return wishlist
  }

  async getMany(args) {
    const wishlists = await wishlistModel.find(args)
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
    const newData = omit(args, ['_id'])
    const dataForUpdate = { ...newData.wishlish }
    const wishlist = await wishlistModel.findByIdAndUpdate(
      args._id,
      {
        $set: dataForUpdate,
      },
      { new: true }
    )
    return wishlist
  }

  async remove(args) {
    const wishlist = await wishlistModel.findByIdAndRemove(args._id)
    return wishlist
  }
}

module.exports = Wishlist
