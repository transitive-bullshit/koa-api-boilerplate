'use strict'

const { AuthToken } = require('../models')

module.exports = () => async (ctx, next) => {
  const authToken = ctx.get('authorization').replace('Bearer ', '') || ctx.query.token

  ctx.auth = await AuthToken.refresh(authToken)
  ctx.assert(ctx.auth, 401, `Auth error, invalid token [${authToken}]`)

  await next()
}
