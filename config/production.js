'use strict'

module.exports = {
  api: {
    enableProcessHooks: true,
    exposeStackTraces: false,
    // TODO
    uri: 'https://service-name.project.com'
  },
  cloudTrace: {
    serviceContext: {
      service: process.env.APP_NAME,
      version: process.env.REVISION
    }
  },
  cloudErrors: {
    ignoreEnvironmentCheck: true,
    serviceContext: {
      service: process.env.APP_NAME,
      version: process.env.REVISION
    }
  },
  logger: {
    colorize: false
  }
}
