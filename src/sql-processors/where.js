const _ = require('lodash')

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
