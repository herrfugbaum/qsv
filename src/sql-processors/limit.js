const _ = require('lodash')

const limit = (limit, arr) => {
  const start = 0
  const stop = limit || arr.length
  return _.slice(arr, start, stop)
}

module.exports = limit
