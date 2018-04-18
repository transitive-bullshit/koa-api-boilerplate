'use strict'

const { readdirSync } = require('fs')

// load and export models
readdirSync(`${__dirname}/../models`).filter((filename) => {
  return /\.js$/.test(filename)
}).forEach((filename) => {
  const model = require(`${__dirname}/../models/${filename}`)

  if (model.on) {
    model.on('index', (err) => {
      if (err) {
        console.error(`error indexing ${model.modelName}`, err)
      }
    })

    model.on('error', (err) => {
      console.error(`mongodb error ${model.modelName}`, err)
    })
  }

  module.exports[model.modelName] = model
})
