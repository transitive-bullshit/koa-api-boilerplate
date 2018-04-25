'use strict'

const jwt = require('jsonwebtoken')

module.exports = (user, opts = { }) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

  return {
    ...opts,
    token,
    user: user.getPublicDocument()
  }
}
