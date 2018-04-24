'use strict'

const { User } = require('lib/models')
const getAuthResponse = require('./get-auth-response')

const parse = require('co-body')

module.exports = async (ctx) => {
  try {
    // try signing in to see if the user already exists
    await module.exports.signin(ctx)
    return
  } catch (err) { }

  const body = await parse(ctx)

  try {
    const safeCreatePaths = User.getSafePaths('signup', ctx)
    const user = await User.safeCreate(body, safeCreatePaths)

    // await email.sendSignupEmail(ctx, user)

    ctx.body = getAuthResponse(user)
  } catch (err) {
    if (isDuplicateError('email', err)) {
      onDuplicateError(ctx, 'email', `Email "${body.email}" is unavailable`)
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
