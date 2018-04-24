'use strict'

const { User } = require('lib/models')
const getAuthResponse = require('./get-auth-response')

const bcrypt = require('bcryptjs')
const parse = require('co-body')

module.exports = async (ctx) => {
  const {
    email,
    password
  } = await parse(ctx)

  const user = await User.findOne({
    email: email.toLowerCase()
  }, null, {
    collation: User.collation
  })
  ctx.assert(user, 403, 'Authentication error')

  const doPasswordsMatch = await bcrypt.compare(password, user.password)
  ctx.assert(doPasswordsMatch, 403, 'Authentication error')

  ctx.body = getAuthResponse(user)
}
