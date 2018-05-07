import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const usersSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    facebookId: {
      type: String
    },
    profile: {
      type: {
        name: String,
        telNo: String,
        avatarUrl: String,
        address: {
          type: {
            district: String,
            province: String,
            country: String,
            zipcode: String,
            detail: String
          }
        }
      }
    },
    storeIds: {
      type: ObjectId,
      ref: 'stores'
    },
    wishlist: {
      type: [{
        name: String,
        productName: String,
        categoryId: {
          type: ObjectId,
          ref: 'categories',
          require: true
        },
        subCategoryId: {
          type: ObjectId,
          ref: 'subCategories',
          require: true
        },
        categoryProps: {
          type: [{
            categoryPropId: {
              type: ObjectId,
              ref: 'categoryProps'
            },
            value: String
          }]
        },
        subCategoryProps: {
          type: [{
            subCategoryPropId: {
              type: ObjectId,
              ref: 'subCategoryProps'
            },
            value: String
          }]
        }
      }]
    }
  },
  {
    timestamp: true,
    collection: 'users'
  }
)

const userModel = mongoose.model('UsersModel', usersSchema)

export class User {
  async getMany (args, limit = 10, skip = 0) {
    const users = await userModel.find(args)
      .skip(skip)
      .limit(limit)
    return users
  }

  async getOne (args) {
    const user = userModel.findOne(args)
    return user
  }

  async create (args) {
    const createResult = await userModel.create(args)
    return createResult
  }

  async updateUserById (_id, args) {
    const updateResult = await userModel.update(
      { _id },
      { $set: args }
    )
    return updateResult.nModified
  }

  async createWishlist (_id, newWishlist) {
    const userBeforeCreated = await userModel.findOne({ _id })
    const oldWishlist = userBeforeCreated.wishlist
    oldWishlist.push(newWishlist)
    await userModel.update(
      { _id },
      { $set: { wishlist: oldWishlist } }
    )
    const userAfterCreated = await userModel.findOne({ _id })
    return userAfterCreated
  }
}
