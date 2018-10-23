const mongoose = require('mongoose')
const { omit } = require('lodash')

const ObjectId = mongoose.Schema.Types.ObjectId

const productSchema = mongoose.Schema(
  {
    storeId: { type: ObjectId, ref: 'stores', require: true },
    storeBranchId: [{ type: ObjectId, ref: 'store_branches', require: true }],
    categoryId: { type: ObjectId, ref: 'categories', require: true },
    subCategoryId: { type: ObjectId, ref: 'sub_categories', require: true },
    categoryProps: [
      {
        propId: { type: ObjectId, ref: 'category_props' },
        value: String,
      },
    ],
    subCategoryProps: [
      {
        propId: { type: ObjectId, ref: 'sub_category_props' },
        value: String,
      },
    ],
    name: { type: String, require: true },
    photoUrlList: [{ type: String, require: true }],
    status: {
      type: String,
      enum: ['AVAILABLE', 'OUT_OF_STOCK'],
      default: 'AVAILABLE',
      require: true,
    },
  },
  {
    timestamps: true,
    collection: 'products',
  }
)

const productModel = mongoose.model('ProductModel', productSchema)

class Product {
  async getMany(args) {
    const products = await productModel.find(args)
    return products
  }

  async getStoreProducts(storeId) {
    const products = await productModel.find({ storeId })
    return products
  }

  async getOne(args) {
    const product = await productModel.findOne(args)
    return product
  }

  async getById(_id) {
    const product = await productModel.findOne({ _id })
    return product
  }

  async getBySubCategoryId(subCategoryId) {
    const products = await productModel.find({ subCategoryId })
    return products
  }

  async getByNameLike(keyword) {
    const products = await productModel.find({
      name: new RegExp(keyword, 'i'),
    })
    return products
  }

  async getBranchProduct(storeBranchId) {
    const products = await productModel.find({ storeBranchId })
    return products
  }

  async create(args) {
    const createResult = await productModel.create(args)
    return createResult
  }

  async update(args) {
    const newData = omit(args, ['_id'])
    const updateResult = await productModel.findByIdAndUpdate(
      args._id,
      {
        $set: newData,
      },
      { new: true }
    )

    return updateResult
  }

  async getProductStatistic(args) {
    let filterAvaialble = { status: 'AVAILABLE' }
    let filterOutOfStock = { status: 'OUT_OF_STOCK' }

    if (args.storeId) {
      filterAvaialble._id = args.storeId
      filterOutOfStock._id = args.storeId
    }

    const available = await productModel.find(filterAvaialble).count()
    const outOfStock = await productModel.find(filterOutOfStock).count()

    return {
      available,
      outOfStock,
      total: available + outOfStock,
    }
  }
}

module.exports = Product
