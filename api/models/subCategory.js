const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const schema = mongoose.Schema(
  {
    categoryId: {
      type: ObjectId,
      refs: 'categories',
      require: true
    },
    name: {
      type: String,
      require: true
    },
    subCatePropIds: {
      type: [{
        type: ObjectId
      }]
    }
  },
  {
    timestamp: true,
    collection: 'subCategories'
  }
)

const subCategoryModel = mongoose.model('subCategoryModel', schema)

class SubCategory {
  async getMany (args, limit = 10, skip = 0) {
    const subCategories = await subCategoryModel.find(args)
      .skip(skip)
      .limit(limit)
    return subCategories
  }

  async getOne (args) {
    const subCategory = subCategoryModel.findOne(args)
    return subCategory
  }

  async getById (id) {
    const subCategories = await subCategoryModel.findOne({ _id: id })
    return subCategories
  }

  async getByCategoryId (categoryId) {
    const subCategory = subCategoryModel.find({ categoryId })
    return subCategory
  }

  async create (args) {
    const createResult = await subCategoryModel.create(args)
    return createResult
  }
}

exports.SubCategory = SubCategory
