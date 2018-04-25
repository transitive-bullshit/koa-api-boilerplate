'use strict'

const request = require('request-promise-native').defaults({
  json: true
})
const env = require('lib/env')

module.exports.auth = async (opts) => {
  const {
    client_id,
    code,
    redirect_uri,
    state
  } = opts

  if (opts.client_id !== env.providerGitHubClientId) {
    throw new Error('invalid github client_id')
  }

  return request({
    method: 'POST',
    uri: 'https://github.com/login/oauth/access_token',
    body: {
      client_id,
      client_secret: env.providerGitHubClientSecret,
      code,
      redirect_uri,
      state
    }
  })
}

module.exports.getMe = async (opts) => {
  const {
    accessToken
  } = opts

  return request({
    method: 'GET',
    uri: 'https://api.github.com/user',
    headers: {
      'Authorization': `token ${accessToken}`
    }
  })
}
