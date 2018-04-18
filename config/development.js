'use strict'

module.exports = {
  api: {
    enableProcessHooks: false,
    exposeStackTraces: true,
    uri: 'http://localhost:5000'
  },
  cloudDebug: false,
  cloudTrace: false,
  cloudErrors: false,
  logger: {
    json: false,
    stringify: false,
    colorize: true
  }
}
