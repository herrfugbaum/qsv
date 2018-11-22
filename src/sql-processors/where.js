const _ = require('lodash')

const where = (condition, arr) => {
  if (condition) {
    switch (condition.operator) {
      case '=':
        return _.filter(arr, { [condition.lhs]: condition.rhs })
      case '<>':
        return _.filter(arr, item => item[condition.lhs] !== condition.rhs)
      case '>':
        return _.filter(arr, item => item[condition.lhs] > condition.rhs)
      case '<':
        return _.filter(arr, item => item[condition.lhs] < condition.rhs)
      case '>=':
        return _.filter(arr, item => item[condition.lhs] >= condition.rhs)
      case '<=':
        return _.filter(arr, item => item[condition.lhs] <= condition.rhs)
    }
  }
  return arr
}

module.exports = where
