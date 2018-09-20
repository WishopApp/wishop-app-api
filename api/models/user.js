const mongoose = require('mongoose')
const { findIndex, assign } = require('lodash')
const { ERROR_MESSAGE } = require('../config/error-message')
const { createBcryptData, compareBcrypt } = require('../libaries/encryption')
const { createUserToken } = require('../libaries/token-manager')

const ObjectId = mongoose.Schema.Types.ObjectId

const usersSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    facebookId: {
      type: String,
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
            detail: String,
          },
        },
      },
    },
    storeIds: {
      type: ObjectId,
      ref: 'stores',
    },
    wishlist: {
      type: [
        {
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
          categoryProps: {
            type: [
              {
                categoryPropId: {
                  type: ObjectId,
                  ref: 'category_props',
                },
                value: String,
              },
            ],
          },
          subCategoryProps: {
            type: [
              {
                subCategoryPropId: {
                  type: ObjectId,
                  ref: 'subCategory_props',
                },
                value: String,
              },
            ],
          },
        },
      ],
    },
  },
  {
    timestamp: true,
    collection: 'users',
  }
)

const userModel = mongoose.model('UsersModel', usersSchema)

class User {
  async getMany(args, limit = 10, skip = 0) {
    const users = await userModel
      .find(args)
      .skip(skip)
      .limit(limit)
    return users
  }

  async getOne(args) {
    const user = userModel.findOne(args)
    return user
  }

  async getById(_id) {
    const user = userModel.findOne({ _id })
    return user
  }

  async create(args) {
    args.password = await createBcryptData(args.password)
    const createResult = await userModel.create(args)
    return createResult
  }

  async update(_id, args) {
    const updateResult = await userModel.update({ _id }, { $set: args })
    return updateResult.nModified
  }

  async createWishlist(userId, newWishlist) {
    const userBeforeCreated = await this.getById(userId)
    if (!userBeforeCreated) {
      throw ERROR_MESSAGE.USER_NOTFOUND
    }

    const oldWishlist = userBeforeCreated.wishlist
    oldWishlist.push(newWishlist)
    await this.update(userId, { wishlist: oldWishlist })

    const userAfterCreated = await this.getById(userId)
    return userAfterCreated
  }

  async updateWishlist(userId, wishlistId, newWishlistData) {
    const userBeforeUpdate = await this.getById(userId)
    if (!userBeforeUpdate) {
      throw ERROR_MESSAGE.USER_NOTFOUND
    }

    const oldWishlist = userBeforeUpdate.wishlist
    const indexToUpdate = findIndex(oldWishlist, ['id', wishlistId])
    if (indexToUpdate === -1) {
      throw ERROR_MESSAGE.WISHLIST_NOTFOUND
    }

    oldWishlist[indexToUpdate] = assign(
      oldWishlist[indexToUpdate],
      newWishlistData
    )
    await this.update(userId, { wishlist: oldWishlist })
    const userAfterUpdated = await this.getById(userId)
    return userAfterUpdated
  }

  async removeWishlist(userId, wishlistId) {
    const userBeforeUpdate = await this.getById(userId)
    if (!userBeforeUpdate) {
      throw ERROR_MESSAGE.USER_NOTFOUND
    }

    const oldWishlist = userBeforeUpdate.wishlist
    const indexToRemove = findIndex(oldWishlist, ['id', wishlistId])
    if (indexToRemove === -1) {
      throw ERROR_MESSAGE.WISHLIST_NOTFOUND
    }

    oldWishlist[indexToRemove] = undefined
    await this.update(userId, { wishlist: oldWishlist })
    const userAfterRemoved = await this.getById(userId)
    return userAfterRemoved
  }

  // AUTH
  async login({ email, password }) {
    const user = await this.getOne({ email })

    const pass = compareBcrypt(password, user.password)

    if (!pass) {
      throw new Error('Authorization failed.')
    }

    const token = createUserToken(user)
    return token
  }
}

module.exports = User
