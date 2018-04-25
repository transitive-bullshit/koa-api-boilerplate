'use strict'

const Router = require('koa-router')
const compose = require('koa-compose')
const middleware = require('lib/middleware')

const pub = new Router()
const pri = new Router()

pub.pst = pub.post
pri.pst = pri.post

// authentication
pub.put('/auth/signin', require('./auth/signin'))
pub.pst('/auth/signup', require('./auth/signup'))

// third-party authentication
pub.put('/auth/github', middleware.authenticate({ passthrough: true }), require('./auth/github'))
pub.put('/auth/facebook', middleware.authenticate({ passthrough: true }), require('./auth/facebook'))

// user resource crud
pri.get('/users/:user', require('./users').read)
pri.put('/users/:user', require('./users').update)

module.exports = () => compose([
  middleware.handleMongodbErrors,
  pub.routes(),
  middleware.authenticate(), middleware.me(),
  pri.routes()
])
