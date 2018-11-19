const mongoose = require('mongoose')
const moment = require('moment-timezone')
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

  async update(statisticId, wishlists) {
    const statistic = await storesStatisticModel.findOne({
      _id: statisticId,
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

        if (cateRankIndex !== -1) {
          oldRanking[cateRankIndex] = {
            categoryId: oldRanking[cateRankIndex].categoryId,
            count: oldRanking[cateRankIndex].count + 1,
          }
        } else {
          oldRanking.push({
            categoryId: w.categoryId,
            count: 1,
          })
        }
      })
    }

    const dateKey = moment.tz(new Date(), 'Asia/Bangkok').format('DD-MM-YY')
    const hour = moment.tz(new Date(), 'Asia/Bangkok').format('HH')

    let hourIndex = hour
    if (parseInt(hour) > 9) {
      hourIndex = hour.substring(1, 2)
    }

    const todayReachCountIndex = findIndex(statistic.reachCount, {
      date: dateKey,
    })

    if (todayReachCountIndex < 0) {
      statistic.reachCount.push({
        date: dateKey,
        hours: Array(24).fill(0),
      })

      statistic.reachCount[0].hours[hourIndex] = 1
    } else {
      const oldReachCount =
        statistic.reachCount[todayReachCountIndex].hours[hourIndex]

      statistic.reachCount[todayReachCountIndex].hours[hourIndex] =
        oldReachCount + 1
    }

    const newdata = {
      reachCount: statistic.reachCount,
      categoryRanking: oldRanking,
    }

    return storesStatisticModel.findByIdAndUpdate(
      statisticId,
      {
        $set: newdata,
      },
      { new: true }
    )
  }
}

module.exports = StoreStatistic
