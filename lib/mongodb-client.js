'use strict'

const mongoose = require('mongoose')
const uri = require('mongodb-uri')
const logger = require('./logger')

// use native promises
mongoose.Promise = global.Promise

module.exports = (dbConfig) => {
  const connectionUri = dbConfig.uri
  if (!connectionUri) throw new Error(`invalid mongodb config: missing uri`)

  const { hosts, database } = uri.parse(connectionUri)
  const isReady = mongoose.connect(connectionUri)

  isReady
    .then(() => {
      hosts.forEach(({ host, port }) => {
        logger.info(`mongodb up and running at mongodb://${host}:${port}/${database}`)
      })
    }, (err) => {
      logger.warn(`mongodb connection error: ${err.message}`)
      throw err
    })

  return {
    readinessCheck: () => isReady,
    shutdown: () => mongoose.disconnect()
  }
}
