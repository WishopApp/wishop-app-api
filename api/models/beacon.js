const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const beaconsSchema = mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    token: { type: String, require: true, unique: true },
    storeId: { type: ObjectId, ref: 'stores', require: true },
    status: {
      type: String,
      enum: ['IDLE', 'INUSE', 'EXPIRED'],
      default: 'IDLE',
      require: true,
    },
  },
  {
    timestamp: true,
    collection: 'beacons',
  }
)

const beaconModel = mongoose.model('BeaconsModel', beaconsSchema)

const Beacon = class Beacon {
  async getMany(args, limit = 10, skip = 0) {
    const beacons = await beaconModel
      .find(args)
      .skip(skip)
      .limit(limit)
    return beacons
  }

  async getOne(args) {
    const beacon = await beaconModel.findOne(args)
    return beacon
  }

  async getById(_id) {
    const beacon = await beaconModel.findOne({ _id })
    return beacon
  }

  async create(args) {
    const beacon = await beaconModel.create(args)
    return beacon
  }
}

module.exports = Beacon
