const _ = require('lodash')

/**
 * Exports the orderBy function.
 * @module sql-processors/orderBy
 * @requires lodash
 */

/**
 * Executes the SQL ORDER BY statement on an Array of Objects
 * @param {Array} columns - An Array of Strings, containing the columns that should get ordered.
 * @param {Array} orders - An Array of Strings, containing the orders for the columns.
 * @param {Array} data - The Array of Objects on which the ORDER BY statement should be executed.
 * @returns {Array} - An Array of Objects in the specified order.
 */

const orderBy = (columns, orders, data) => {
  if (columns.length > 0 && orders.length > 0) {
    const lowerOrders = orders.map(order => order.toLowerCase())
    return _.orderBy(data, columns, lowerOrders)
  }
  return data
}

module.exports = orderBy
