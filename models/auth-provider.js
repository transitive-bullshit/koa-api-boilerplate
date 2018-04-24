'use strict'

const mongoose = require('mongoose')

const AuthProvider = new mongoose.Schema({
  provider: { type: String },
  id: { type: String },
  accessToken: { type: String },
  refreshToken: { type: String }
})

module.exports = AuthProvider
