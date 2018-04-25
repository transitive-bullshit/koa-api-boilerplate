'use strict'

const { User } = require('lib/models')
const getAuthResponse = require('./get-auth-response')
// const signin = require('./signin')

const parse = require('co-body')

module.exports = async (ctx) => {
  /*
  try {
    // try signing in to see if the user already exists
    await signin(ctx)
    return
  } catch (err) { }
  */

  const body = await parse(ctx)
  ctx.assertParam(body.email, 'email')
  ctx.assertParam(body.password, 'password')

  const user = await module.exports.createUser(ctx, body)

  ctx.body = getAuthResponse(user, { new: true })
}

module.exports.createUser = async (ctx, body) => {
  try {
    const safeCreatePaths = User.getSafePaths('signup', ctx)
    const user = await User.safeCreate(body, safeCreatePaths)

    // await email.sendSignupEmail(ctx, user)

    return user
  } catch (err) {
    if (isDuplicateError('email', err)) {
      onDuplicateError(ctx, 'email', `Email "${body.email}" is unavailable`)
    } else {
      throw err
    }
  }
}

function isDuplicateError (type, err) {
  return err.code === 11000 && err.message.includes(type)
}

function onDuplicateError (ctx, reason, message) {
  ctx.set('x-status-reason', reason)
  ctx.throw(409, message)
}
