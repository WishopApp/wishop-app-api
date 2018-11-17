const fs = require('fs')
const path = require('path')
const { camelCase, replace, forEach } = require('lodash')

const modelPath = path.join(__dirname, '../models')
const modelFiles = fs.readdirSync(modelPath)

const createModelName = (file) => camelCase(replace(file, '.js', ''))

const models = {}

const modelsCreator = () => {
  forEach(modelFiles, (file) => {
    const Model = require('../models/' + file)
    models[createModelName(file)] = new Model()
  })
}

modelsCreator()

module.exports = models
