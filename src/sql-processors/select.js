const _ = require('lodash')

const select = (columns, table) => {
  if (columns[0] !== '*') {
    return _.map(table, obj => _.pick(obj, columns))
  }
  return table
}

module.exports = select
