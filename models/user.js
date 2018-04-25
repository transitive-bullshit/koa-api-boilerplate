'use strict'

const bcrypt = require('bcryptjs')
const emailValidator = require('email-validator')
const mongoose = require('mongoose')

const AuthProvider = require('./auth-provider')
const Schema = require('./common/base-schema')
const sha256 = require('../lib/sha256')

const User = new Schema({
  email: { type: String, required: true, lowercase: true },
  password: { type: String },
  role: { type: String, default: 'user' },

  // metadata
  name: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  image: { type: String },

  // email and password confirmation info
  emailConfirmed: { type: Boolean, default: false },
  emailConfirmedAt: { type: Date },
  emailConfirmToken: { type: String },
  passwordResetToken: { type: String },

  providers: {
    facebook: AuthProvider,
    github: AuthProvider
  }
})

User.statics.collation = { locale: 'en', strength: 1 }

User.index({ email: 1 }, { unique: true, collation: User.statics.collation })
User.index({ emailConfirmToken: 1 }, { unique: true, sparse: true })
User.index({ passwordResetToken: 1 }, { unique: true, sparse: true })

User.index({ 'providers.facebook.id': 1 }, { unique: true, sparse: true })
User.index({ 'providers.github.id': 1 }, { unique: true, sparse: true })

User.path('email').validate((value) => {
  return emailValidator.validate(value)
}, 'Invalid email address')

User.path('password').set((value) => {
  if (!value.match(/.{3,1024}/)) return value
  return bcrypt.hashSync(value, 1)
})

User.path('password').validate((value) => {
  return (value.match(/.{3,1024}/))
}, 'Path `{PATH}` is invalid: `{VALUE}`')

User.pre('save', function (next) {
  if (!this.emailConfirmToken && this.isNew) {
    this.emailConfirmToken = sha256()
  }
  next()
})

User.statics.safePaths = {
  create: [
    'email',
    'name',
    'firstName',
    'lastName',
    'password',
    'image'
  ],
  read: [
    '*',
    '!_*',
    '!password',
    '!emailConfirmToken',
    '!passwordResetToken',
    '!providers'
  ],
  update: [
    'firstName',
    'lastName',
    'image'
  ]
}

module.exports = mongoose.model('User', User)
