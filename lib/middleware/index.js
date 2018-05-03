'use strict'

const { readdirSync } = require('fs')
const toCamelCase = require('camelcase')

readdirSync(__dirname)
  .filter((filename) => filename.endsWith('.js'))
  .forEach((filename) => {
    const moduleName = toCamelCase(filename.replace('.js', ''))
    exports[moduleName] = require(`${__dirname}/${filename}`)
  })

exports.gzip = require('koa-gzip')
exports.mount = require('koa-mount')
