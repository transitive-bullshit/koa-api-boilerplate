'use strict'

const { readdirSync } = require('fs')
const toCamelCase = require('to-camel-case')

readdirSync(__dirname)
  .filter((filename) => filename.endsWith('.js'))
  .forEach((filename) => {
    const moduleName = toCamelCase(filename.replace('.js', ''))
    module.exports[moduleName] = require(`${__dirname}/${filename}`)
  })

module.exports.gzip = require('koa-gzip')
module.exports.mount = require('koa-mount')
