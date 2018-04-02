import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    subCategoryIds: {
      type: [{
        type: ObjectId
      }]
    },
    catePropIds: {
      type: [{
        type: ObjectId
      }]
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

  async createCategory (args) {
    const createResult = await categoryModel.create(args)
    return createResult
  }
}
