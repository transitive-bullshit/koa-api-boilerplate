'use strict'

const { Facebook } = require('fb')
const env = require('lib/env')

const fb = new Facebook({
  appId: env.providerFacebookClientId,
  appSecret: env.providerFacebookClientSecret
})

module.exports.getMe = async (opts) => {
  const {
    accessToken
  } = opts

  fb.setAccessToken(accessToken)

  return fb.api('me', {
    fields: 'id,name,email,picture.type(large)'
  })
}
