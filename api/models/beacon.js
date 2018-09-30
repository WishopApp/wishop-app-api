const mongoose = require('mongoose')
const { omit } = require('lodash')

const beaconsSchema = mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    assignId: { type: String },
    locationX: { type: Number, default: 0 },
    locationY: { type: Number, default: 0 },
    identifier: { type: String, require: true, default: 'Estimotes' },
    uuid: { type: String, require: true },
    major: { type: Number, require: true },
    minor: { type: Number, require: true },
    type: {
      type: String,
      enum: ['INDOOR', 'STICKER'],
    },
    status: {
      type: String,
      enum: ['IDLE', 'INUSE', 'EXPIRE'],
      default: 'IDLE',
      require: true,
    },
  },
  {
    timestamps: true,
    collection: 'beacons',
  }
)

const beaconModel = mongoose.model('BeaconsModel', beaconsSchema)

const Beacon = class Beacon {
  async getMany(args) {
    const beacons = await beaconModel.find(args)
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

  async getAllByStoreId(storeId) {
    const beacons = await beaconModel.find({ storeId })
    return beacons
  }

  async create(args) {
    const beacon = await beaconModel.create(args)
    return beacon
  }

  async update(args) {
    const newData = omit(args, ['_id'])
    const beacon = await beaconModel.findByIdAndUpdate(
      args._id,
      {
        $set: newData,
      },
      { new: true }
    )
    return beacon
  }
}

module.exports = Beacon
