'use strict'

const { AuthToken } = require('lib/models')
const config = require('config')
const apiToken = config.get('api.token')

module.exports = () => async (ctx, next) => {
  const authToken = ctx.get('authorization').replace('Bearer ', '') || ctx.query.token

  if (authToken === apiToken) {
    ctx.auth = {
      user: 'worker',
      role: 'worker'
    }
  } else {
    ctx.auth = await AuthToken.refresh(authToken)
    ctx.assert(ctx.auth, 401, `Auth error, invalid token [${authToken}]`)
  }

  await next()
}
