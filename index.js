'use strict'

require('dotenv-safe').load()
require('./lib/patch-require')

const app = require('koa-micro')()
const logger = require('lib/logger')
const middleware = require('lib/middleware')
const shutdown = require('lib/shutdown')

// const mongoose = require('mongoose')
// mongoose.set('debug', true)

require('lib/dbs')

app.use(middleware.mount('/1', require('api-v1')()))

const port = process.env.PORT || 5000
const server = app.listen(port, () => {
  logger.info(`${process.env.APP_NAME}:${process.env.REVISION} up @ http://localhost:${port}`)
})

process.on('SIGINT', () => server.close(shutdown))

// export for test suite
exports.app = app
exports.listen = (done) => server.listening ? done() : server.on('listening', done)
exports.close = (done) => server.close(done)
