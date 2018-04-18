'use strict'

const { serial: test } = require('ava')
const config = require('config')
const dbs = require('./dbs')

for (let dbName in config.get('dbs')) {
  const db = dbs[dbName]

  test(`${dbName} - readinessCheck`, async t => {
    t.truthy(await db.readinessCheck())
  })

  test(`${dbName} - livenessCheck`, async t => {
    t.truthy(await db.livenessCheck())
  })

  test(`${dbName} - shutdown`, async t => {
    await db.shutdown()
    t.pass()
  })
}
