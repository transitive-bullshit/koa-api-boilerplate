'use strict'

const { User } = require('lib/models')
const logger = require('lib/logger')
const github = require('lib/services/github')

const { createUser } = require('./signup')
const getAuthResponse = require('./get-auth-response')

const parse = require('co-body')

module.exports = async (ctx) => {
  const body = await parse(ctx)

  const {
    access_token: accessToken
  } = await github.auth(body)
  ctx.assert(accessToken, 400, 'authentication error')

  logger.info(JSON.stringify({ accessToken }, null, 2))

  const ghUser = await github.getMe({ accessToken })
  ctx.assert(ghUser, 400, 'error fetching user')

  logger.info('github', JSON.stringify(ghUser, null, 2))

  const opts = { }
  let user

  if (ctx.state.user) {
    user = await User.findById(ctx.state.user.id)
    ctx.assert(user, 404, 'error fetching authenticated user')
  } else {
    user = await User.findOne({
      $or: [
        { 'providers.github.id': ghUser.id },
        { 'email': ghUser.email.toLowerCase() }
      ]
    }, null, {
      collation: User.collation
    })

    if (user) {
      // user has previously created an account and is trying to login with
      // github. TODO: is automatically logging them in and adding github
      // to a matched email account secure? Probably not unless they've also
      // verified their email, but for our purposes it should be fine...
    } else {
      opts.new = true

      // user is authenticating a new account for the first time
      user = await createUser(ctx, {
        email: ghUser.email,
        name: ghUser.name,
        image: ghUser.avatar_url
      })
    }
  }

  user.providers.github = {
    provider: 'github',
    id: ghUser.id,
    accessToken
  }

  await user.save()
  ctx.body = getAuthResponse(user, opts)
}
