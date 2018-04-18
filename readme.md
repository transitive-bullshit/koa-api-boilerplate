# koa-api-boilerplate

> [Koa 2](http://koajs.com/) API boilerplate with batteries-included.

[![NPM](https://img.shields.io/npm/v/koa-api-boilerplate.svg)](https://www.npmjs.com/package/koa-api-boilerplate) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

- [koa-micro](https://github.com/transitive-bullshit/koa-micro) - microservices with batteries included
  - Koa 2 app
  - Common context utilities
  - Common middleware like error handling, response time, CORS, auth, etc
  - Logger supporting [Google Cloud Trace](https://cloud.google.com/trace/)
  - Error handler middleware with [Google Cloud Errors](https://cloud.google.com/error-reporting/)
  - Health check endpoint (`/alive` by default)
- [koa2-mongoose-crud](https://github.com/transitive-bullshit/koa2-mongoose-crud) - CRUD middleware for Mongoose models
  - Quickly create RESTful APIs over mongodb models

## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
