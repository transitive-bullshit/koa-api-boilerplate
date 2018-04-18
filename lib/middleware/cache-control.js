'use strict'

module.exports = (opts) => {
  const values = [ ]

  const defaultPrivacy = 'public' // default cacheable by reverse proxies
  const defaultMaxAge = 60 * 5 // default max-age of 5 minutes

  if (!opts) {
    values.push(defaultPrivacy)
    values.push(`max-age=${defaultMaxAge}`)
  } else {
    if ('privacy' in opts) {
      values.push(opts.privacy)
    }

    if ('maxAge' in opts) {
      values.push(`max-age=${opts.maxAge}`)
    }
  }

  const value = values.join('; ')

  return async (ctx, next) => {
    await next()

    // only set cache-control header if it's not already set
    if (!ctx.response.get('cache-control')) {
      const methodIsCacheable = (ctx.method === 'GET' || ctx.method === 'HEAD')
      if (methodIsCacheable && ctx.status >= 200 && ctx.status < 300 && !ctx.isStream) {
        ctx.set('cache-control', value)
      }
    }
  }
}
