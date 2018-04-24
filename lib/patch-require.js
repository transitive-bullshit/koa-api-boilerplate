'use strict'

// better local require() path for node.js
// https://gist.github.com/branneman/8048520#6-the-hack
process.env.NODE_PATH = `${process.env.NODE_PATH}:${__dirname}/../`
require('module').Module._initPaths()
