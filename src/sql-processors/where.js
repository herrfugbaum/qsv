const _ = require('lodash')

/**
 * Exports the where function.
 * @module sql-processors/where
 * @requires lodash
 */

/**
 * Executes the SQL WHERE statement on an Array of Objects.
 * @param {Object} condition
 * @param {Array} data
 * @returns {Array}
 */

const where = (condition, data) => {
  if (condition) {
    switch (condition.operator) {
      case '=':
        return _.filter(data, { [condition.lhs]: condition.rhs })
      case '<>':
        return _.filter(data, item => item[condition.lhs] !== condition.rhs)
      case '>':
        return _.filter(data, item => item[condition.lhs] > condition.rhs)
      case '<':
        return _.filter(data, item => item[condition.lhs] < condition.rhs)
      case '>=':
        return _.filter(data, item => item[condition.lhs] >= condition.rhs)
      case '<=':
        return _.filter(data, item => item[condition.lhs] <= condition.rhs)
    }
  }
  return data
}

module.exports = where
