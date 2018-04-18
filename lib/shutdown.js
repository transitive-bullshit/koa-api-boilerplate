'use strict'

const dbs = require('./dbs')

module.exports = async () => {
  return Promise.all(Object.values(dbs).map(db => db.shutdown()))
}
