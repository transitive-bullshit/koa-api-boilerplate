'use strict'

const Router = require('koa-router')
const compose = require('koa-compose')
const middleware = require('../lib/middleware')

const {
  auth,
  me
} = middleware

const pub = new Router()
const pri = new Router()

pub.pst = pub.post
pri.pst = pri.post

pub.use(middleware.handleMongodbErrors)

module.exports = () => compose([
  pub.routes(),
  auth(), me(),
  pri.routes()
])
