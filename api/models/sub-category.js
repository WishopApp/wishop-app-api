const mongoose = require('mongoose')
const { omit } = require('lodash')

const ObjectId = mongoose.Schema.Types.ObjectId

const schema = mongoose.Schema(
  {
    categoryId: {
      type: ObjectId,
      refs: 'categories',
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    subCateProps: [
      {
        type: ObjectId,
        ref: 'sub_category_props',
      },
    ],
  },
  {
    timestamps: true,
    collection: 'sub_categories',
  }
)

const subCategoryModel = mongoose.model('subCategoryModel', schema)

class SubCategory {
  async getMany(args) {
    const subCategories = await subCategoryModel.find(args)
    return subCategories
  }

  async getOne(args) {
    const subCategory = subCategoryModel.findOne(args)
    return subCategory
  }

  async getById(id) {
    const subCategories = await subCategoryModel.findOne({ _id: id })
    return subCategories
  }

  async getByCategoryId(categoryId) {
    const subCategory = subCategoryModel.find({ categoryId })
    return subCategory
  }

  async create(args) {
    const createResult = await subCategoryModel.create(args)
    return createResult
  }

  async update(args) {
    const newdata = omit(args, ['_id'])
    const updateResult = await subCategoryModel.findByIdAndUpdate(args._id, {
      $set: newdata,
    })
    return updateResult
  }
}

module.exports = SubCategory
