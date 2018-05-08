import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const BEACON_STATUSES = [
  'AVAILABLE',
  'INUSED',
  'CLOSED'
]

const beaconsSchema = mongoose.Schema(
  {
    beaconId: { type: String, require: true, unique: true },
    name: { type: String, require: true, unique: true },
    status: { type: String, require: true, enum: BEACON_STATUSES, default: BEACON_STATUSES[0] },
    number: { type: String, require: true, unique: true },
    branchId: { type: ObjectId, ref: 'store_branches' }
  },
  {
    timestamp: true,
    collection: 'beacons'
  }
)

const beaconModel = mongoose.model('BeaconsModel', beaconsSchema)

export class Store {
  async getMany (args, limit = 10, skip = 0) {
    const beacons = await beaconModel.find(args)
      .skip(skip)
      .limit(limit)
    return beacons
  }
}
