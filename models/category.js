'use strict'

const mongoose = require('mongoose')

const BaseSchema = require('./common/base-schema')

const Category = new BaseSchema({
  slug: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },

  disabled: { type: Boolean, default: false },

  parent: { type: [ String ] },
  keywords: { type: [ String ] },
  folder: { type: Boolean },

  image: { type: String },
  logo: { type: String }
})

Category.index({ slug: 1 })
Category.index({ disabled: 1 })
Category.index({ folder: -1 })

Category.statics.safePaths = {
  'read': [
    '*',
    '!_*'
  ]
}

Category.statics.flushall = async () => {
  await module.exports.collection.drop()
  await module.exports.ensureIndexes()
}

module.exports = mongoose.model('Category', Category)
