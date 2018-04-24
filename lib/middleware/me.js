'use strict'

module.exports = () => async (ctx, next) => {
  const regex = /^\/(me)(\/|$)/

  if (regex.test(ctx.path)) {
    ctx.path = ctx.path.replace(regex, `/users/${ctx.state.user.id}$2`)
  }

  await next()
}
