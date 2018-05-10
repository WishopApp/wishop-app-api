const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    }
  },
  {
    timestamp: true,
    collection: 'categories'
  }
)

const categoryModel = mongoose.model('CategoryModel', categorySchema)

class Category {
  async getMany (args, limit = 10, skip = 0) {
    const categories = await categoryModel.find(args)
      .skip(skip)
      .limit(limit)
    return categories
  }

  async getOne (args) {
    const category = await categoryModel.findOne(args)
    return category
  }

  async getById (_id) {
    const category = await categoryModel.findOne({ _id })
    return category
  }

  async create (args) {
    const createResult = await categoryModel.create(args)
    return createResult
  }
}

module.exports = Category
