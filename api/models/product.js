const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const productSchema = mongoose.Schema(
  {
    storeId: { type: ObjectId, ref: 'stores', require: true },
    storeBranchId: [{ type: ObjectId, ref: 'store_branches', require: true }],
    categoryId: { type: ObjectId, ref: 'categories', require: true },
    subCategoryId: { type: ObjectId, ref: 'sub_categories', require: true },
    categoryProps: [{
      propId: { type: ObjectId, ref: 'category_props' },
      value: String
    }],
    subCategoryProps: [{
      propId: { type: ObjectId, ref: 'sub_category_props' },
      value: String
    }],
    name: { type: String, require: true }
  },
  {
    timestamp: true,
    collection: 'products'
  }
)

const productModel = mongoose.model('ProductModel', productSchema)

class Product {
  async getMany (args, limit = 10, skip = 0) {
    const products = await productModel.find(args)
      .skip(skip)
      .limit(limit)
    return products
  }

  async getStoreProducts (storeId) {
    const products = await productModel.find({ storeId })
    return products
  }

  async getOne (args) {
    const product = await productModel.findOne(args)
    return product
  }

  async getById (_id) {
    const product = await productModel.findOne({ _id })
    return product
  }

  async create (args) {
    const createResult = await productModel.create(args)
    return createResult
  }
}

module.exports = Product
