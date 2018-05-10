const mongoose = require('mongoose')

const BEACON_STATUSES = [
  'AVAILABLE',
  'INUSED',
  'CLOSED'
]

const beaconsSchema = mongoose.Schema(
  {
    token: { type: String, require: true, unique: true },
    name: { type: String, require: true, unique: true },
    status: { type: String, require: true, enum: BEACON_STATUSES, default: BEACON_STATUSES[0] }
  },
  {
    timestamp: true,
    collection: 'beacons'
  }
)

const beaconModel = mongoose.model('BeaconsModel', beaconsSchema)

const Beacon = class Beacon {
  async getMany (args, limit = 10, skip = 0) {
    const beacons = await beaconModel.find(args)
      .skip(skip)
      .limit(limit)
    return beacons
  }

  async getOne (args) {
    const beacon = await beaconModel.findOne(args)
    return beacon
  }

  async getById (_id) {
    const beacon = await beaconModel.findOne({ _id })
    return beacon
  }

  async create (args) {
    const beacon = await beaconModel.create(args)
    return beacon
  }
}

module.exports = Beacon
