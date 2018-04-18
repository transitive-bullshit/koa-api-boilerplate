'use strict'

module.exports = (endpointsACLByRole) => async (ctx, next) => {
  const role = ctx.auth.role
  const endpointsACL = endpointsACLByRole[role]
  ctx.assert(endpointsACL, 403, `unsupported role ${role}`)
  const endpoints = endpointsACL(ctx.auth)

  for (let [method, regexp] of endpoints) {
    if ((method === '*' || ctx.method === method) && regexp.test(ctx.path)) {
      return next()
    }
  }

  ctx.throw(403)
}
