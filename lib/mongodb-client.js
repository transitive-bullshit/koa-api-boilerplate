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
  const { connection } = mongoose.connect(connectionUri)

  const isReady = new Promise((resolve, reject) => {
    let isInitialConnection = true

    connection.once('open', () => {
      if (isInitialConnection) {
        isInitialConnection = false
        resolve(true)
      }

      hosts.forEach(({ host, port }) => {
        logger.info(`mongodb up and running at mongodb://${host}:${port}/${database}`)
      })
    })

    connection.once('error', (err) => {
      logger.warn(`cannot connect to mongodb: ${err.message}`)
      if (isInitialConnection) {
        isInitialConnection = false
        reject(err)
      }

      setTimeout(() => { throw new Error(`MongoDB connection failed: ${err.message}`) }, 0)
    })

    connection.on('close', () => logger.info('mongodb connection closed'))
  })

  connection.readinessCheck = async () => {
    return isReady
  }

  connection.livenessCheck = async () => {
    // http://mongoosejs.com/docs/api.html#connection_Connection-readyState
    return (connection.readyState === 1)
  }

  connection.shutdown = async () => {
    return connection.close()
  }

  return connection
}
