const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const beaconHistorySchema = mongoose.Schema(
  {
    beaconId: { type: ObjectId, ref: 'beacons', require: true },
    title: String,
    type: {
      type: String,
      enum: ['IDLE', 'ASSIGN', 'EXPIRE'],
      default: 'IDLE',
      require: true,
    },
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
  async getAll(args) {
    const beacons = await beaconHistoryModel.find(args)
    return beacons
  }

  async create(args) {
    const beacon = await beaconHistoryModel.create(args)
    return beacon
  }
}

module.exports = BeaconHistory
