const mongoose = require('mongoose')
const { findIndex, assign, omit } = require('lodash')
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
    facebookId: String,
    profile: {
      name: String,
      telNo: String,
      avatarUrl: String,
      address: {
        district: String,
        province: String,
        countryCode: String,
        zipcode: String,
        detail: String,
      },
    },
    wishlistIds: [
      {
        type: ObjectId,
        ref: 'wishlists',
      },
    ],
    storeIds: [
      {
        type: ObjectId,
        ref: 'stores',
      },
    ],
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

  async update(args) {
    const newData = omit(args, ['_id'])
    const updateResult = await userModel.findByIdAndUpdate(args._id, {
      $set: newData,
    })
    return updateResult
  }

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
