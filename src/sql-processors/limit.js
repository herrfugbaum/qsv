const _ = require('lodash')

/**
 * Exports the limit function.
 * @module sql-processors/limit
 * @requires lodash
 */

/**
 * Executes the SQL LIMIT statement on an dataay of Objects.
 * @function limit
 * @param {Number} limit
 * @param {Array} data
 * @returns {Array}
 */

const limit = (limit, data) => {
  const start = 0
  const stop = limit || data.length
  return _.slice(data, start, stop)
}

module.exports = limit
