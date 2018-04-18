import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const schema = mongoose.Schema(
  {
    subCategoryId: {
      type: [{
        type: ObjectId
      }],
      ref: 'subCateogories',
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
    collection: 'subCategoryProps'
  }
)

const subCategoryPropModel = mongoose.model('SubCategoryPropModel', schema)

export class SubCategoryProp {
  async getMany (args, limit = 10, skip = 0) {
    const subCategoryProps = await subCategoryPropModel.find(args)
      .skip(skip)
      .limit(limit)
    return subCategoryProps
  }

  async getOne (args) {
    const subCategoryProp = subCategoryPropModel.findOne(args)
    return subCategoryProp
  }

  async create (args) {
    const createResult = await subCategoryPropModel.create(args)
    return createResult
  }
}
