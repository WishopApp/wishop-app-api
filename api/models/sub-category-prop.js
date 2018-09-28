const mongoose = require('mongoose')
const { omit } = require('lodash')

const ObjectId = mongoose.Schema.Types.ObjectId

const schema = mongoose.Schema(
  {
    subCategoryId: {
      type: ObjectId,
      ref: 'sub_cateogories',
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
    collection: 'sub_category_props',
  }
)

const subCategoryPropModel = mongoose.model('SubCategoryPropModel', schema)

class SubCategoryProp {
  async getMany(args) {
    const subCategoryProps = await subCategoryPropModel.find(args)
    return subCategoryProps
  }

  async getOne(args) {
    const subCategoryProp = subCategoryPropModel.findOne(args)
    return subCategoryProp
  }

  async getById(_id) {
    const subCategoryProp = subCategoryPropModel.findOne({ _id })
    return subCategoryProp
  }

  async getBySubCategoryId(subCategoryId) {
    const subCategoryProps = await subCategoryPropModel.find({ subCategoryId })
    return subCategoryProps
  }

  async create(args) {
    const createResult = await subCategoryPropModel.create(args)
    return createResult
  }

  async update(args) {
    const newdata = omit(args, ['_id'])
    const updateResult = await subCategoryPropModel.findByIdAndUpdate(
      args._id,
      {
        $set: newdata,
      }
    )
    return updateResult
  }
}

module.exports = SubCategoryProp
