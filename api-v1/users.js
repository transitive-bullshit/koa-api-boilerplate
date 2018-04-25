'use strict'

const crud = require('koa2-mongoose-crud')

const { User } = require('../lib/models')

const model = User
const idParamName = 'user'

exports.read = crud.read({ model, idParamName })
exports.update = crud.update({ model, idParamName })
