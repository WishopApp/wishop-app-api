const mongoose = require('mongoose')
const { omit } = require('lodash')

const ObjectId = mongoose.Schema.Types.ObjectId

const schema = mongoose.Schema(
  {
    categoryId: {
      type: ObjectId,
      ref: 'cateogories',
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    values: [
      {
        type: String,
      },
    ],
  },
  {
    timestamp: true,
    collection: 'category_props',
  }
)

const categoryPropModel = mongoose.model('CategoryPropModel', schema)

class CategoryProp {
  async getMany(args) {
    const categoryProps = await categoryPropModel.find(args)

    return categoryProps
  }

  async getOne(args) {
    const categoryProp = categoryPropModel.findOne(args)
    return categoryProp
  }

  async getById(_id) {
    const categoryProp = categoryPropModel.findOne({ _id })
    return categoryProp
  }

  async getByCategoryId(categoryId) {
    const categoryProps = await categoryPropModel.find({ categoryId })
    return categoryProps
  }

  async create(args) {
    const createResult = await categoryPropModel.create(args)
    return createResult
  }

  async update(args) {
    const newdata = omit(args, ['_id'])
    const updateResult = await categoryPropModel.findByIdAndUpdate(args._id, {
      $set: newdata,
    })
    return updateResult
  }
}

module.exports = CategoryProp
