'use strict'

module.exports = () => async (ctx, next) => {
  const regex = /^\/(me)(\/|$)/

  if (regex.test(ctx.path)) {
    ctx.path = ctx.path.replace(regex, `/users/${ctx.auth.user}$2`)
  }

  await next()
}
