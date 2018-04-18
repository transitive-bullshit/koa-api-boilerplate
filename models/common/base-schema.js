'use strict'

const { Schema } = require('mongoose')
const filter = require('filter-object')

const BaseSchema = module.exports = function BaseSchema (...args) {
  Schema.call(this, ...args)

  this.set('toObject', {
    virtuals: true,
    getters: true,
    minimize: false
  })

  this.set('minimize', false)
  this.set('timestamps', true)
  this.set('skipversioning', true)
  this.set('emitIndexErrors', true)

  const _index = this.index
  this.index = (fields, options = {}) => {
    options.background = false
    _index.call(this, fields, options)
  }

  this.statics.safeCreate = async function (data, safePaths = '*') {
    const safeData = filter(data, safePaths)

    delete safeData._id
    delete safeData.id
    delete safeData.createdAt
    delete safeData.updatedAt

    return this.create(safeData)
  }

  this.statics.getPublicDocument = function (doc, safePaths = '*') {
    return Object.assign(filter(doc.toObject(), safePaths), {
      id: doc._id
    })
  }

  this.statics.getSafePaths = (label) => {
    if (this.statics.safePaths) {
      return this.statics.safePaths[label] || '*'
    } else {
      return '*'
    }
  }

  const schema = this
  this.methods.getPublicDocument = function () {
    return schema.statics.getPublicDocument(this, schema.statics.getSafePaths('read'))
  }
}

Object.setPrototypeOf(BaseSchema.prototype, Schema.prototype)
