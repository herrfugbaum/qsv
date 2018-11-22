const _ = require('lodash')

const orderBy = (columns, orders, data) => {
  if (orders.length > 0) {
    const lowerOrders = orders.map(order => order.toLowerCase())
    return _.orderBy(data, columns, lowerOrders)
  }
  return data
}

module.exports = orderBy
