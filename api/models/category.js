const mongoose = require('mongoose')
const { omit } = require('lodash')

const ObjectId = mongoose.Schema.Types.ObjectId

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    cateProps: [
      {
        type: ObjectId,
        ref: 'category_props',
      },
    ],
  },
  {
    timestamps: true,
    collection: 'categories',
  }
)

const categoryModel = mongoose.model('CategoryModel', categorySchema)

class Category {
  async getMany(args) {
    const categories = await categoryModel.find(args)
    return categories
  }

  async getAllByUserId(userId) {
    const categories = await categoryModel.find({ userId })
    return categories
  }

  async getOne(args) {
    const category = await categoryModel.findOne(args)
    return category
  }

  async getById(_id) {
    const category = await categoryModel.findOne({ _id })
    return category
  }

  async create(args) {
    const createResult = await categoryModel.create(args)
    return createResult
  }

  async update(args) {
    const newdata = omit(args, ['_id'])
    const updateResult = await categoryModel.findByIdAndUpdate(args._id, {
      $set: newdata,
    })
    return updateResult
  }
}

module.exports = Category
