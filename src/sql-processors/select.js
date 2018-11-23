const _ = require('lodash')

/**
 * Exports the select function.
 * @module sql-processors/select
 * @requires lodash
 */

/**
 * Executes the SQL SELECT statement on an Array of Objects.
 * @function select
 * @param {Array} columns - An Array of Strings containting the columns the SELECT statement should return.
 * @param {Array} table - The Array of Objects on which the SELECT statement should be executed.
 * @returns {Array} - An Array of Objects containing only the selected columns, or the original array if called with ['*']
 * @example
 * select(['*'], [{name: 'Bob', age: 55}, {name: 'Aisha', age: 34}])
 * // returns [{name: 'Bob', age: 55}, {name: 'Aisha', age: 34}]
 * @example
 * select(['name, age'], [{name: 'Bob', age: 55}, {name: 'Aisha', age: 34}])
 * // returns [{name: 'Bob', age: 55}, {name: 'Aisha', age: 34}]
 * @example
 * select(['age'], [{name: 'Bob', age: 55}, {name: 'Aisha', age: 34}])
 * // returns [{age: 55}, {age: 34}]
 */
const select = (columns, table) => {
  if (columns[0] !== '*') {
    return _.map(table, obj => _.pick(obj, columns))
  }
  return table
}

module.exports = select
