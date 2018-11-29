'use strict'

const fs = require('fs-extra')

const streamFile = path => {
  const stream = fs.createReadStream(path)
  return stream
}

module.exports = streamFile
