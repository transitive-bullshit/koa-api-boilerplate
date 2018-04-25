'use strict'

const Router = require('koa-router')
const compose = require('koa-compose')
const middleware = require('../lib/middleware')

const pub = new Router()
const pri = new Router()

pub.pst = pub.post
pri.pst = pri.post

// authentication
pub.put('/auth/signin', require('./auth/signin'))
pub.put('/auth/signup', require('./auth/signup'))

pub.put('/auth/github', middleware.authenticate({ passthrough: true }), require('./auth/github'))

// user resource crud
pri.get('/users/:user', require('./users').read)
pri.put('/users/:user', require('./users').update)

module.exports = () => compose([
  middleware.handleMongodbErrors,
  pub.routes(),
  middleware.authenticate(), middleware.me(),
  pri.routes()
])
