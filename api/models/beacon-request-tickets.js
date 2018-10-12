const mongoose = require('mongoose')
const { omit } = require('lodash')

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
    const beaconTickets = await beaconRequestTicketModel.find(args)
    return beaconTickets
  }

  async getOne(args) {
    const beaconTicket = await beaconRequestTicketModel.findOne(args)
    return beaconTicket
  }

  async getById(_id) {
    const beaconTicket = await beaconRequestTicketModel.findOne({ _id })
    return beaconTicket
  }

  async create(args) {
    const beaconTicket = await beaconRequestTicketModel.create(args)
    return beaconTicket
  }

  async update(args) {
    const newData = omit(args, ['_id'])
    const beaconTicket = await beaconRequestTicketModel.findByIdAndUpdate(
      args._id,
      {
        $set: newData,
      },
      { new: true }
    )
    return beaconTicket
  }

  async getStatistic() {
    const newTicket = await beaconRequestTicketModel
      .find({ status: 'NEW' })
      .count()
    const complete = await beaconRequestTicketModel
      .find({ status: 'COMPLETE' })
      .count()
    const reject = await beaconRequestTicketModel
      .find({ status: 'REJECTED' })
      .count()

    return {
      new: newTicket,
      complete,
      reject,
      total: newTicket + complete + reject,
    }
  }
}

module.exports = BeaconRequest
