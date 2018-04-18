'use strict'

const mongodb = { }

if (process.env.MONGODB_PASSWORD) {
  mongodb.uri = `mongodb://binge-tv-prod:${process.env.MONGODB_PASSWORD}@binge-tv-prod-shard-00-00-epvxe.mongodb.net:27017,binge-tv-prod-shard-00-01-epvxe.mongodb.net:27017,binge-tv-prod-shard-00-02-epvxe.mongodb.net:27017/binge-tv?ssl=true&replicaSet=binge-tv-prod-shard-0&authSource=admin`
}

module.exports = {
  dbs: {
    mongodb
  }
}
