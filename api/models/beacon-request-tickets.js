const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const beaconRequestTicketSchema = mongoose.Schema(
  {
    storeId: { type: ObjectId, ref: 'stores', require: true },
    telNo: String,
    type: {
      type: String,
      enum: ['NEW', 'MORE'],
      default: 'NEW',
      require: true,
    },
    status: {
      type: String,
      enum: ['NEW', 'COMPLETE', 'REJECTED'],
      default: 'NEW',
      require: true,
    },
  },
  {
    timestamps: true,
    collection: 'beacon_request_tickets',
  }
)

const beaconRequestTicketModel = mongoose.model(
  'BeaconRequestTicketModel',
  beaconRequestTicketSchema
)

const BeaconRequest = class BeaconRequest {
  async getMany(args) {
    const beacons = await beaconRequestTicketModel.find(args)
    return beacons
  }

  async getOne(args) {
    const beacon = await beaconRequestTicketModel.findOne(args)
    return beacon
  }

  async getById(_id) {
    const beacon = await beaconRequestTicketModel.findOne({ _id })
    return beacon
  }

  async create(args) {
    const beacon = await beaconRequestTicketModel.create(args)
    return beacon
  }
}

module.exports = BeaconRequest
