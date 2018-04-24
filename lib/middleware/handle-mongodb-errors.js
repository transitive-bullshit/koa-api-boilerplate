'use strict'

module.exports = async (ctx, next) => {
  try {
    await next(ctx)
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400
    } else if (err.name === 'MongoError' && err.code === 11000) {
      err.status = 409

      if (err.writeErrors) {
        err.message = `${err.writeErrors.length} duplicate key errors`
        ctx.errors = err.writeErrors.slice(0, 10).map(({ errmsg }) => {
          const value = errmsg.match(/\{ : "([^}]+)" \}/)[1]
          return `Duplicate key error: "${value}"`
        })
      } else {
        const value = err.message.match(/\{ : "([^}]+)" \}/)
        err.message = value ? `Duplicate key error: "${value[1]}"` : err.message
      }
    }

    if (err.errors && !ctx.errors) {
      ctx.errors = Object.keys(err.errors)
        .map((key) => `${key}: ${err.errors[key].message}`)
    }

    ctx.throw(err)
  }
}
