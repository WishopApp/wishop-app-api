const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const beaconHistorySchema = mongoose.Schema(
  {
    beaconId: { type: ObjectId, ref: 'beacons', require: true },
    title: String,
  },
  {
    timestamps: true,
    collection: 'beacons_history',
  }
)

const beaconHistoryModel = mongoose.model(
  'BeaconHistoryModel',
  beaconHistorySchema
)

const BeaconHistory = class BeaconHistory {
  async getMany(args) {
    const beacons = await beaconHistoryModel.find(args)

    return beacons
  }

  async getOne(args) {
    const beacon = await beaconHistoryModel.findOne(args)
    return beacon
  }

  async getById(_id) {
    const beacon = await beaconHistoryModel.findOne({ _id })
    return beacon
  }

  async create(args) {
    const beacon = await beaconHistoryModel.create(args)
    return beacon
  }
}

module.exports = BeaconHistory
