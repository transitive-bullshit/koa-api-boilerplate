'use strict'

const config = require('config')
const logger = require('./logger')

for (let dbName in config.get('dbs')) {
  const dbConfig = config.get(`dbs.${dbName}`)

  if (dbConfig) {
    try {
      const db = require(`./${dbName}-client`)(dbConfig)

      if (!isValidDB(db)) {
        throw new Error(`invalid db interface "${dbName}"`)
      }

      db.config = dbConfig
      module.exports[dbName] = db
    } catch (err) {
      // ensure error gets printed during tests if db is improperly configured
      logger.error(`error initializing db "${dbName}"`, dbConfig, err)
      console.error(`error initializing db "${dbName}"`, dbConfig, err)
      throw err
    }
  }
}

function isValidDB (db) {
  return (
    db &&
    typeof db.readinessCheck === 'function' &&
    typeof db.readinessCheck().then === 'function' &&
    typeof db.shutdown === 'function'
  )
}
