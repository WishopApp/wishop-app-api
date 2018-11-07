const mongoose = require('mongoose')
const { omit } = require('lodash')
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
    storeId: {
      type: ObjectId,
      ref: 'stores',
    },
    status: {
      type: String,
      enum: ['CUSTOMER', 'SHOP_OWNER', 'BANNED'],
      require: true,
      default: 'CUSTOMER',
    },
    role: {
      type: String,
      enum: ['NORMAL', 'ADMIN', 'STORE_STAFF'],
      require: true,
      default: 'NORMAL',
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
)

const userModel = mongoose.model('UsersModel', usersSchema)

class User {
  async getMany(args) {
    const users = await userModel.find(args)
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

  async getUserStatistic(args) {
    let filterCustomer = { status: 'CUSTOMER' }
    let filterShopOwner = { status: 'SHOP_OWNER' }
    let filterBanned = { status: 'BANNED' }

    if (args.userId) {
      filterCustomer._id = args.userId
      filterShopOwner._id = args.userId
      filterBanned._id = args.userId
    }

    const customer = await userModel.find(filterCustomer).count()
    const shopOwner = await userModel.find(filterShopOwner).count()
    const banned = await userModel.find(filterBanned).count()

    return {
      customer,
      shopOwner,
      banned,
      total: customer + shopOwner + banned,
    }
  }

  async create(args) {
    args.password = await createBcryptData(args.password)
    const createResult = await userModel.create(args)
    return createResult
  }

  async update(args) {
    const newData = omit(args, ['_id'])
    const updateResult = await userModel.findByIdAndUpdate(
      args._id,
      {
        $set: newData,
      },
      { new: true }
    )
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
