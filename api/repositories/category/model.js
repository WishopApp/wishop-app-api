import mongoose from 'mongoose'

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

export class Category {
  async getMany (args, limit = 10, skip = 0) {
    const categories = await categoryModel.find(args)
      .skip(skip)
      .limit(limit)
    return categories
  }

  async getOne (args) {
    const category = categoryModel.findOne(args)
    return category
  }

  async create (args) {
    const createResult = await categoryModel.create(args)
    return createResult
  }
}
