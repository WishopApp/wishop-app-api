const { zipObject } = require('lodash')

const statusArray = [
  'AVAILABLE',
  'INUSED',
  'CLOSED'
]

const statusObject = zipObject(statusArray, statusArray)

statusObject.default = statusArray[0]

exports.statusArray = statusArray

exports.statusObject = statusObject
