'use strict'

const jwt = require('koa-jwt')

module.exports = (opts = { }) => {
  return jwt({
    ...opts,
    secret: process.env.JWT_SECRET
  })
}
