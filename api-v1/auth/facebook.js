'use strict'

const { User } = require('lib/models')
const logger = require('lib/logger')
const facebook = require('lib/services/facebook')

const { createUser } = require('./signup')
const getAuthResponse = require('./get-auth-response')

const parse = require('co-body')

module.exports = async (ctx) => {
  const body = await parse(ctx)

  const { accessToken } = body
  ctx.assertParam(accessToken, 'accessToken')

  logger.info(JSON.stringify(body, null, 2))

  const fbUser = await facebook.getMe({ accessToken })
  ctx.assert(fbUser, 400, 'error fetching facebook user')

  logger.info('facebook', JSON.stringify(fbUser, null, 2))

  const opts = { }
  let user

  if (ctx.state.user) {
    // currently authenticated user is linking their account to facebook
    user = await User.findById(ctx.state.user.id)
    ctx.assert(user, 404, 'error fetching authenticated user')
  } else {
    user = await User.findOne({
      $or: [
        { 'providers.facebook.id': fbUser.id },
        { 'email': fbUser.email.toLowerCase() }
      ]
    }, null, {
      collation: User.collation
    })

    if (user) {
      // user has previously created an account and is trying to login with
      // facebook. TODO: is automatically logging them in and adding facebook
      // to a matched email account secure? Probably not unless they've also
      // verified their email, but for our purposes it should be fine...
    } else {
      opts.new = true

      // user is authenticating a new account for the first time
      user = await createUser(ctx, {
        email: fbUser.email,
        name: fbUser.name,
        image: fbUser.picture.data.url
      })
    }
  }

  user.providers.facebook = {
    provider: 'facebook',
    id: fbUser.id,
    accessToken
  }

  await user.save()
  ctx.body = getAuthResponse(user, opts)
}
