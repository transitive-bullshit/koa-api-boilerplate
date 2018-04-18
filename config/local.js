'use strict'

const mongodb = { }

if (process.env.MONGODB_PASSWORD) {
  // TODO
  // mongodb.uri = `mongodb://text-blast-prod:${process.env.MONGODB_PASSWORD}@text-blast-prod-shard-00-00-epvxe.mongodb.net:27017,text-blast-prod-shard-00-01-epvxe.mongodb.net:27017,text-blast-prod-shard-00-02-epvxe.mongodb.net:27017/text-blast?ssl=true&replicaSet=text-blast-prod-shard-0&authSource=admin`
}

module.exports = {
  dbs: {
    mongodb
  }
}
