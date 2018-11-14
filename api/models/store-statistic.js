const mongoose = require('mongoose')
const moment = require('moment')
const { findIndex } = require('lodash')

const ObjectId = mongoose.Schema.Types.ObjectId

const storesStatisticSchema = mongoose.Schema(
  {
    storeBranchId: { type: ObjectId, ref: 'store_branch', require: true },
    reachCount: [
      {
        date: String,
        hours: [Number],
      },
    ],
    categoryRanking: [
      {
        categoryId: { type: ObjectId, ref: 'stores', require: true },
        count: Number,
      },
    ],
    recentCustomers: [
      {
        wishlistId: { type: ObjectId, ref: 'wishlists', require: true },
        visitAt: String,
      },
    ],
  },
  {
    timestamps: true,
    collection: 'stores_statistic',
  }
)

const storesStatisticModel = mongoose.model(
  'StoresStatisticModel',
  storesStatisticSchema
)

class StoreStatistic {
  async getMany(args) {
    const stores = await storesStatisticModel.find(args)
    return stores
  }

  async getOne(args) {
    const store = await storesStatisticModel.findOne(args)
    return store
  }

  async getById(_id) {
    const store = await storesStatisticModel.findOne({ _id })
    return store
  }

  async create(args) {
    const store = await storesStatisticModel.create(args)
    return store
  }

  async update(branchId, wishlists) {
    const statistic = await storesStatisticModel.findOne({
      storeBranchId: branchId,
    })

    let oldRanking = statistic.categoryRanking
    if (!oldRanking) {
      oldRanking = []
      wishlists.map(w => ({
        categoryId: w.categoryId,
        count: 1,
      }))
    } else {
      wishlists.map(w => {
        const cateRankIndex = findIndex(oldRanking, {
          categoryId: w.categoryId,
        })

        if (cateRankIndex >= 0) {
          oldRanking[cateRankIndex] = {
            categoryId: oldRanking[cateRankIndex].categoryId,
            count: oldRanking[cateRankIndex].count + 1,
          }
        }

        oldRanking.push({
          categoryId: w.categoryId,
          count: 1,
        })
      })
    }

    const dateKey = moment(new Date()).format('DD-MM-YY')
    const hourIndex = moment(new Date()).format('HH')

    const todayReachCountIndex = findIndex(statistic.reachCount, {
      date: dateKey,
    })

    if (!todayReachCountIndex) {
      statistic.reachCount[todayReachCountIndex] = {
        date: dateKey,
        hours: Array(24).fill(0),
      }
    }

    statistic.reachCount[todayReachCountIndex].hours[hourIndex] = 1

    return storesStatisticModel.findOneAndUpdate({
      storeBranchId: branchId,
      reachCount: statistic.reachCount,
      categoryRanking: oldRanking,
    })
  }
}

module.exports = StoreStatistic
