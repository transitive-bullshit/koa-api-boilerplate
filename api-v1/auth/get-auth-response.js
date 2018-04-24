'use strict'

const jwt = require('jsonwebtoken')

module.exports = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

  return {
    token,
    user: user.getPublicDocument()
  }
}
