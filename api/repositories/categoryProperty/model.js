import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const schema = mongoose.Schema(
  {
    categoryId: {
      type: [{
        type: ObjectId
      }],
      ref: 'cateogories',
      require: true
    },
    name: {
      type: String,
      require: true
    },
    values: {
      type: [{
        type: String
      }]
    }
  },
  {
    timestamp: true,
    collection: 'categoryProps'
  }
)

const categoryPropModel = mongoose.model('CategoryPropModel', schema)

export class CategoryProp {
  async getMany (args, limit = 10, skip = 0) {
    const categoryProps = await categoryPropModel.find(args)
      .skip(skip)
      .limit(limit)
    return categoryProps
  }

  async getOne (args) {
    const categoryProp = categoryPropModel.findOne(args)
    return categoryProp
  }

  async getByCategoryId (categoryId) {
    const categoryProps = await categoryPropModel.find({ categoryId })
    return categoryProps
  }

  async create (args) {
    const createResult = await categoryPropModel.create(args)
    return createResult
  }
}
