const mongoose = require('mongoose')

const promotionSchema = mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    type: {
      type: String,
      enum: ['PRICE'],
      require: true,
    },
  },
  {
    timestamps: true,
    collection: 'promotions',
  }
)

const promotionModel = mongoose.model('PromotionModel', promotionSchema)

const Promotion = class Promotion {
  async getMany(args) {
    const promotions = await promotionModel.find(args)

    return promotions
  }

  async getOne(args) {
    const promotion = await promotionModel.findOne(args)
    return promotion
  }

  async getById(_id) {
    const promotion = await promotionModel.findOne({ _id })
    return promotion
  }

  async create(args) {
    const promotion = await promotionModel.create(args)
    return promotion
  }
}

module.exports = Promotion
