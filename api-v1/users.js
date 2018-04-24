'use strict'

const { User } = require('../lib/models')

const crud = require('koa2-mongoose-crud')

const model = User
const idParamName = 'user'

exports.read = crud.read({ model, idParamName })
exports.update = crud.update({ model, idParamName })
