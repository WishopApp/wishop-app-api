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
    wishlistProducts: {
      type: [{
        categoryId: {
          type: ObjectId,
          ref: 'categories'
        },
        subCategoryId: {
          type: ObjectId,
          ref: 'subCategories'
        },
        categoryProps: {
          type: [{
            categoryId: {
              type: ObjectId,
              ref: 'categoryProperties'
            },
            value: String
          }]
        }
      }]
    },
    wishlistSets: {
      type: [{
        name: String,
        products: {
          type: [{
            categoryId: {
              type: ObjectId,
              ref: 'categories'
            },
            subCategoryId: {
              type: ObjectId,
              ref: 'subCategories'
            },
            categoryProps: {
              type: [{
                categoryId: {
                  type: ObjectId,
                  ref: 'categories'
                },
                value: String
              }]
            },
            subCategoryProps: {
              type: [{
                subCategoryId: {
                  type: ObjectId,
                  ref: 'subCategories'
                },
                value: String
              }]
            }
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

    console.log(updateResult)
    return 'updated!'
  }
}
